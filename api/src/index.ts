import { createApp } from "./app";
import { env } from "./config/env";
import { DatabaseClient } from "./db/mongoClient";
import { masterScreenDamages } from "./master-screen/data/masterScreenDamages";
import { healthController } from "./controllers/healthController";
import { createMasterScreenDamagesController } from "./master-screen/controllers/masterScreenController";
import { createMasterScreenTransportController } from "./master-screen/controllers/masterScreenTransportController";
import { createMasterScreenPropertiesController } from "./master-screen/controllers/masterScreenPropertiesController";
import { createMasterScreenLifestyleController } from "./master-screen/controllers/masterScreenLifestyleController";
import { MasterScreenDamageRepository } from "./master-screen/repositories/masterScreenDamageRepository";
import { MasterScreenDamageService } from "./master-screen/services/masterScreenDamageService";
import { MasterScreenTransportRepository } from "./master-screen/repositories/masterScreenTransportRepository";
import { MasterScreenTransportService } from "./master-screen/services/masterScreenTransportService";
import { MasterScreenPropertiesRepository } from "./master-screen/repositories/masterScreenPropertiesRepository";
import { MasterScreenPropertiesService } from "./master-screen/services/masterScreenPropertiesService";
import { MasterScreenLifestyleRepository } from "./master-screen/repositories/masterScreenLifestyleRepository";
import { MasterScreenLifestyleService } from "./master-screen/services/masterScreenLifestyleService";
import {
  masterScreenBoats,
  masterScreenMounts,
  masterScreenMountEquipments,
} from "./master-screen/data/masterScreenTransport";
import {
  masterScreenBuildings,
  masterScreenMaintenances,
} from "./master-screen/data/masterScreenBuildings";
import { masterScreenLifestyles } from "./master-screen/data/masterScreenLifestyles";

const databaseClient = new DatabaseClient(env.mongoUrl);
const masterScreenDamageRepository = new MasterScreenDamageRepository({
  databaseClient,
  seedData: masterScreenDamages,
});
const masterScreenDamageService = new MasterScreenDamageService(
  masterScreenDamageRepository,
);
const masterScreenTransportRepository = new MasterScreenTransportRepository({
  databaseClient,
  boats: masterScreenBoats,
  mounts: masterScreenMounts,
  mountEquipments: masterScreenMountEquipments,
});
const masterScreenTransportService = new MasterScreenTransportService(
  masterScreenTransportRepository,
);
const masterScreenPropertiesRepository = new MasterScreenPropertiesRepository({
  databaseClient,
  buildings: masterScreenBuildings,
  maintenances: masterScreenMaintenances,
});
const masterScreenPropertiesService = new MasterScreenPropertiesService(
  masterScreenPropertiesRepository,
);
const masterScreenLifestyleRepository = new MasterScreenLifestyleRepository({
  databaseClient,
  lifestyles: masterScreenLifestyles,
});
const masterScreenLifestyleService = new MasterScreenLifestyleService(
  masterScreenLifestyleRepository,
);

const masterScreenDamagesController = createMasterScreenDamagesController({
  masterScreenDamageService,
});
const masterScreenTransportController = createMasterScreenTransportController({
  masterScreenTransportService,
});
const masterScreenPropertiesController = createMasterScreenPropertiesController({
  masterScreenPropertiesService,
});
const masterScreenLifestyleController = createMasterScreenLifestyleController({
  masterScreenLifestyleService,
});

const app = createApp({
  corsOrigin: env.corsOrigin,
  healthController,
  masterScreenDamagesController,
  masterScreenTransportController,
  masterScreenPropertiesController,
  masterScreenLifestyleController,
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
