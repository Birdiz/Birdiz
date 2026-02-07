import type { Collection } from "mongodb";
import type { DatabaseClient } from "../db/mongoClient";
import type { MasterScreenDamage } from "../data/masterScreenDamages";

export interface MasterScreenDamageDocument extends MasterScreenDamage {
  sortOrder: number;
}

interface MasterScreenDamageRepositoryOptions {
  databaseClient: DatabaseClient;
  seedData: MasterScreenDamage[];
}

export class MasterScreenDamageRepository {
  private readonly databaseClient: DatabaseClient;
  private readonly seedData: MasterScreenDamage[];
  private readonly collectionName: string;

  constructor({
    databaseClient,
    seedData,
  }: MasterScreenDamageRepositoryOptions) {
    this.databaseClient = databaseClient;
    this.seedData = seedData;
    this.collectionName = "master_screen_damages";
  }

  async ensureSeedData(): Promise<void> {
    const collection = await this.getCollection();
    const totalDocuments = await collection.estimatedDocumentCount();

    if (totalDocuments > 0) {
      return;
    }

    await collection.insertMany(
      this.seedData.map((damage, index) => ({
        ...damage,
        sortOrder: index + 1,
      })),
    );
  }

  async findAll(): Promise<MasterScreenDamageDocument[]> {
    const collection = await this.getCollection();

    return collection
      .find({}, { projection: { _id: 0, die: 1, examples: 1, sortOrder: 1 } })
      .sort({ sortOrder: 1 })
      .toArray();
  }

  private async getCollection(): Promise<Collection<MasterScreenDamageDocument>> {
    const database = await this.databaseClient.getDatabase();

    return database.collection<MasterScreenDamageDocument>(this.collectionName);
  }
}
