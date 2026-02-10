import type { Collection } from "mongodb";
import type { DatabaseClient } from "../../db/mongoClient";

export abstract class BaseSeededRepository {
  private readonly databaseClient: DatabaseClient;

  protected constructor(databaseClient: DatabaseClient) {
    this.databaseClient = databaseClient;
  }

  protected async ensureCollectionSeedData(
    collectionName: string,
    seedData: object[],
  ): Promise<void> {
    const collection = await this.getCollection(collectionName);
    const totalDocuments = await collection.estimatedDocumentCount();

    if (totalDocuments > 0) {
      await this.backfillCollectionLocalization(collection, seedData);
      return;
    }

    await collection.insertMany(
      seedData.map((entry, index) => ({
        ...entry,
        sortOrder: index + 1,
      })),
    );
  }

  protected async findAllFromCollection<T>(collectionName: string): Promise<T[]> {
    const collection = await this.getCollection(collectionName);

    return collection
      .find({}, { projection: { _id: 0, sortOrder: 0 } })
      .sort({ sortOrder: 1 })
      .toArray() as Promise<T[]>;
  }

  protected async getCollection(collectionName: string): Promise<Collection<object>> {
    const database = await this.databaseClient.getDatabase();

    return database.collection<object>(collectionName);
  }

  protected async backfillCollectionLocalization(
    collection: Collection<object>,
    seedData: object[],
  ): Promise<void> {
    await Promise.all(
      seedData.map((entry, index) => {
        const payload = this.createLocalizationBackfillPayload(
          entry as Record<string, unknown>,
        );

        if (Object.keys(payload).length === 0) {
          return Promise.resolve();
        }

        return collection.updateOne(
          { sortOrder: index + 1 },
          {
            $set: payload,
          },
        );
      }),
    );
  }

  protected createLocalizationBackfillPayload(
    entry: Record<string, unknown>,
  ): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(entry).filter(([key]) =>
        ["nameEn", "nameFr", "descriptionEn", "descriptionFr"].includes(key),
      ),
    );
  }
}
