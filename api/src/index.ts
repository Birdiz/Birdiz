import { createApp } from "./app";
import { env } from "./config/env";
import { DatabaseClient } from "./db/mongoClient";
import { masterScreenDamages } from "./data/masterScreenDamages";
import { healthController } from "./controllers/healthController";
import { createSummaryController } from "./controllers/summaryController";
import { createMasterScreenDamagesController } from "./controllers/masterScreenController";
import { MasterScreenDamageRepository } from "./repositories/masterScreenDamageRepository";
import { MasterScreenDamageService } from "./services/masterScreenDamageService";

const databaseClient = new DatabaseClient(env.mongoUrl);
const masterScreenDamageRepository = new MasterScreenDamageRepository({
  databaseClient,
  seedData: masterScreenDamages,
});
const masterScreenDamageService = new MasterScreenDamageService(
  masterScreenDamageRepository,
);

const summaryController = createSummaryController({ databaseClient });
const masterScreenDamagesController = createMasterScreenDamagesController({
  masterScreenDamageService,
});

const app = createApp({
  corsOrigin: env.corsOrigin,
  healthController,
  summaryController,
  masterScreenDamagesController,
});

const server = app.listen(env.port, () => {
  console.log(`Birdiz API listening on port ${env.port}`);
});

let shuttingDown = false;

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`Received ${signal}, closing Birdiz API...`);

  server.close(async () => {
    await databaseClient.close();
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
