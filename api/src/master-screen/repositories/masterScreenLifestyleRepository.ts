import type { Collection } from "mongodb";
import type { DatabaseClient } from "../../db/mongoClient";
import type { MasterScreenLifestyle } from "../data/masterScreenLifestyles";

interface MasterScreenLifestyleRepositoryOptions {
  databaseClient: DatabaseClient;
  lifestyles: MasterScreenLifestyle[];
}

export class MasterScreenLifestyleRepository {
  private readonly databaseClient: DatabaseClient;
  private readonly lifestyles: MasterScreenLifestyle[];

  constructor({
    databaseClient,
    lifestyles,
  }: MasterScreenLifestyleRepositoryOptions) {
    this.databaseClient = databaseClient;
    this.lifestyles = lifestyles;
  }

  async ensureSeedData(): Promise<void> {
    const collection = await this.getCollection();
    const totalDocuments = await collection.estimatedDocumentCount();

    if (totalDocuments > 0) {
      return;
    }

    await collection.insertMany(
      this.lifestyles.map((entry, index) => ({
        ...entry,
        sortOrder: index + 1,
      })),
    );
  }

  async findAll(): Promise<MasterScreenLifestyle[]> {
    const collection = await this.getCollection();

    return collection
      .find({}, { projection: { _id: 0, sortOrder: 0 } })
      .sort({ sortOrder: 1 })
      .toArray() as unknown as Promise<MasterScreenLifestyle[]>;
  }

  private async getCollection(): Promise<Collection<object>> {
    const database = await this.databaseClient.getDatabase();

    return database.collection<object>("master_screen_lifestyles");
  }
}
