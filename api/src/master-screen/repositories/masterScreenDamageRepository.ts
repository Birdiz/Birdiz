import type { Collection } from "mongodb";
import type { DatabaseClient } from "../../db/mongoClient";
import type { MasterScreenDamage } from "../data/masterScreenDamages";
import { COLLECTION_NAMES } from "../constants/collectionNames";

export interface MasterScreenDamageDocument {
  die: string;
  examples?: string[];
  examplesFr?: string[];
  examplesEn?: string[];
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
    this.collectionName = COLLECTION_NAMES.DAMAGES;
  }

  async ensureSeedData(): Promise<void> {
    const collection = await this.getCollection();
    const totalDocuments = await collection.estimatedDocumentCount();

    if (totalDocuments === 0) {
      await collection.insertMany(
        this.seedData.map((damage, index) => ({
          ...damage,
          sortOrder: index + 1,
        })),
      );

      return;
    }

    await Promise.all(
      this.seedData.map((damage) =>
        collection.updateOne(
          { die: damage.die },
          {
            $set: {
              examplesFr: damage.examplesFr,
              examplesEn: damage.examplesEn,
            },
          },
        ),
      ),
    );
  }

  async findAll(): Promise<MasterScreenDamageDocument[]> {
    const collection = await this.getCollection();

    return collection
      .find(
        {},
        {
          projection: {
            _id: 0,
            die: 1,
            examples: 1,
            examplesFr: 1,
            examplesEn: 1,
            sortOrder: 1,
          },
        },
      )
      .sort({ sortOrder: 1 })
      .toArray();
  }

  private async getCollection(): Promise<Collection<MasterScreenDamageDocument>> {
    const database = await this.databaseClient.getDatabase();

    return database.collection<MasterScreenDamageDocument>(this.collectionName);
  }
}
