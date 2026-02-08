import { MongoClient, type Db } from "mongodb";

export class DatabaseClient {
  private readonly connectionString: string;
  private client: MongoClient | null;
  private databasePromise: Promise<Db> | null;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
    this.client = null;
    this.databasePromise = null;
  }

  async getDatabase(): Promise<Db> {
    if (!this.databasePromise) {
      this.client = new MongoClient(this.connectionString);
      this.databasePromise = this.client
        .connect()
        .then((connectedClient) => connectedClient.db())
        .catch(async (error: unknown) => {
          // Allow future calls to retry when an initial connection attempt fails.
          this.databasePromise = null;

          if (this.client) {
            await this.client.close().catch(() => undefined);
            this.client = null;
          }

          throw error;
        });
    }

    return this.databasePromise;
  }

  async close(): Promise<void> {
    if (!this.client) {
      return;
    }

    await this.client.close();
    this.client = null;
    this.databasePromise = null;
  }
}
