import type { Collection } from "mongodb";
import type { DatabaseClient } from "../../db/mongoClient";
import type { MagicItemImportRunDocument } from "../import/magicItemImportTypes";

interface MagicItemImportRunRepositoryOptions {
  databaseClient: DatabaseClient;
}

export class MagicItemImportRunRepository {
  private readonly databaseClient: DatabaseClient;
  private readonly collectionName: string;

  constructor({ databaseClient }: MagicItemImportRunRepositoryOptions) {
    this.databaseClient = databaseClient;
    this.collectionName = "magic_item_import_runs";
  }

  async create(run: MagicItemImportRunDocument): Promise<void> {
    const collection = await this.getCollection();
    await collection.insertOne(run);
  }

  async update(runId: string, patch: Partial<MagicItemImportRunDocument>): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne({ runId }, { $set: patch });
  }

  private async getCollection(): Promise<Collection<MagicItemImportRunDocument>> {
    const database = await this.databaseClient.getDatabase();

    return database.collection<MagicItemImportRunDocument>(this.collectionName);
  }
}
