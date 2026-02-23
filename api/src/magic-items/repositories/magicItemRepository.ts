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

  async findByStatus(status: MagicItemDocument["status"]): Promise<MagicItemDocument[]> {
    const collection = await this.getCollection();

    return collection
      .find({ status }, { projection: { _id: 0 } })
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

    type SyncItemResult = "inserted" | "updated" | "unchanged";

    const itemResults = await Promise.all(
      items.map(async (item, index): Promise<SyncItemResult> => {
        const existing = existingById.get(item.canonicalId);
        const sortOrder = index + 1;
        let result: SyncItemResult;

        if (!existing) {
          result = "inserted";
        } else if (
          existing.sourceRowHash &&
          item.sourceRowHash &&
          existing.sourceRowHash === item.sourceRowHash &&
          existing.status === item.status
        ) {
          result = "unchanged";
        } else {
          result = "updated";
        }

        await collection.updateOne(
          { canonicalId: item.canonicalId },
          { $set: { ...item, sortOrder } },
          { upsert: true },
        );

        return result;
      }),
    );

    const inserted = itemResults.filter((r) => r === "inserted").length;
    const updated = itemResults.filter((r) => r === "updated").length;
    const unchanged = itemResults.filter((r) => r === "unchanged").length;

    const toDeactivate = existingItems.filter(
      (item) => !importedIds.has(item.canonicalId) && item.status === "active",
    );

    await Promise.all(
      toDeactivate.map((item) =>
        collection.updateOne(
          { canonicalId: item.canonicalId },
          { $set: { status: "inactive" } },
        ),
      ),
    );

    return {
      inserted,
      updated,
      unchanged,
      deactivated: toDeactivate.length,
    };
  }

  private async getCollection(): Promise<Collection<MagicItemDocument>> {
    const database = await this.databaseClient.getDatabase();

    return database.collection<MagicItemDocument>(this.collectionName);
  }
}
