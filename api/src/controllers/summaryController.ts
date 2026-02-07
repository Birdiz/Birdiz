import type { RequestHandler } from "express";
import type { DatabaseClient } from "../db/mongoClient";

interface SummaryControllerOptions {
  databaseClient: DatabaseClient;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export function createSummaryController({
  databaseClient,
}: SummaryControllerOptions): RequestHandler {
  return async function summaryController(_req, res): Promise<void> {
    try {
      const database = await databaseClient.getDatabase();
      const collections = await database.listCollections().toArray();

      res.json({
        message: "Birdiz API is running",
        database: database.databaseName,
        collections: collections.map((collection) => collection.name),
      });
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to connect to MongoDB",
        error: getErrorMessage(error),
      });
    }
  };
}
