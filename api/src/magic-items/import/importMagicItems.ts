import { env } from "../../config/env";
import { DatabaseClient } from "../../db/mongoClient";
import { AideddClient } from "./aideddClient";
import { AideddParser } from "./aideddParser";
import { MagicItemImportRunRepository } from "../repositories/magicItemImportRunRepository";
import { MagicItemRepository } from "../repositories/magicItemRepository";
import { MagicItemImportService } from "../services/magicItemImportService";

async function main(): Promise<void> {
  if (!env.magicItemsImportEnabled) {
    console.error("Magic items import is disabled. Set MAGIC_ITEMS_IMPORT_ENABLED=true.");
    process.exitCode = 1;
    return;
  }

  const databaseClient = new DatabaseClient(env.mongoUrl);

  try {
    const importService = new MagicItemImportService({
      aideddClient: new AideddClient(),
      aideddParser: new AideddParser(),
      magicItemRepository: new MagicItemRepository({
        databaseClient,
        seedData: [],
      }),
      magicItemImportRunRepository: new MagicItemImportRunRepository({
        databaseClient,
      }),
    });

    const summary = await importService.runImport();

    console.log(JSON.stringify(summary, null, 2));

    if (summary.status !== "success") {
      process.exitCode = 1;
    }
  } finally {
    await databaseClient.close();
  }
}

void main();
