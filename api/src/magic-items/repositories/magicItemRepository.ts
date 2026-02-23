import type { Collection } from "mongodb";
import type { DatabaseClient } from "../../db/mongoClient";
import type { MagicItemDocument } from "../types/magicItemTypes";

interface MagicItemRepositoryOptions {
  databaseClient: DatabaseClient;
  seedData: Omit<MagicItemDocument, "sortOrder">[];
}

export class MagicItemRepository {
  private readonly databaseClient: DatabaseClient;
  private readonly seedData: Omit<MagicItemDocument, "sortOrder">[];
  private readonly collectionName: string;

  constructor({ databaseClient, seedData }: MagicItemRepositoryOptions) {
    this.databaseClient = databaseClient;
    this.seedData = seedData;
    this.collectionName = "magic_items";
  }

  async ensureSeedData(): Promise<void> {
    const collection = await this.getCollection();
    const totalDocuments = await collection.estimatedDocumentCount();

    if (totalDocuments === 0) {
      await collection.insertMany(
        this.seedData.map((item, index) => ({
          ...item,
          sortOrder: index + 1,
        })),
      );

      return;
    }

    await Promise.all(
      this.seedData.map((item, index) =>
        collection.updateOne(
          { canonicalId: item.canonicalId },
          {
            $set: {
              ...item,
              sortOrder: index + 1,
            },
          },
          { upsert: true },
        ),
      ),
    );
  }

  async findAll(): Promise<MagicItemDocument[]> {
    const collection = await this.getCollection();

    return collection
      .find({}, { projection: { _id: 0 } })
      .sort({ sortOrder: 1 })
      .toArray();
  }

  async findByCanonicalId(canonicalId: string): Promise<MagicItemDocument | null> {
    const collection = await this.getCollection();

    return collection.findOne({ canonicalId }, { projection: { _id: 0 } });
  }

  async syncImportedItems(
    items: Omit<MagicItemDocument, "sortOrder">[],
  ): Promise<{
    inserted: number;
    updated: number;
    unchanged: number;
    deactivated: number;
  }> {
    const collection = await this.getCollection();
    const existingItems = await this.findAll();
    const existingById = new Map(
      existingItems.map((item) => [item.canonicalId, item]),
    );
    const importedIds = new Set(items.map((item) => item.canonicalId));

    let inserted = 0;
    let updated = 0;
    let unchanged = 0;
    let deactivated = 0;

    await Promise.all(
      items.map(async (item, index) => {
        const existing = existingById.get(item.canonicalId);
        const sortOrder = index + 1;

        if (!existing) {
          inserted += 1;
        } else if (
          existing.sourceRowHash &&
          item.sourceRowHash &&
          existing.sourceRowHash === item.sourceRowHash &&
          existing.status === item.status
        ) {
          unchanged += 1;
        } else {
          updated += 1;
        }

        await collection.updateOne(
          { canonicalId: item.canonicalId },
          { $set: { ...item, sortOrder } },
          { upsert: true },
        );
      }),
    );

    await Promise.all(
      existingItems
        .filter((item) => !importedIds.has(item.canonicalId) && item.status === "active")
        .map(async (item) => {
          deactivated += 1;
          await collection.updateOne(
            { canonicalId: item.canonicalId },
            { $set: { status: "inactive" } },
          );
        }),
    );

    return {
      inserted,
      updated,
      unchanged,
      deactivated,
    };
  }

  private async getCollection(): Promise<Collection<MagicItemDocument>> {
    const database = await this.databaseClient.getDatabase();

    return database.collection<MagicItemDocument>(this.collectionName);
  }
}
