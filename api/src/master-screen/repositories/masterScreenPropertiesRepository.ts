import type { DatabaseClient } from "../../db/mongoClient";
import type {
  MasterScreenBuilding,
  MasterScreenMaintenance,
} from "../data/masterScreenBuildings";
import { BaseSeededRepository } from "./baseSeededRepository";
import { COLLECTION_NAMES } from "../constants/collectionNames";

export interface MasterScreenPropertiesData {
  buildings: MasterScreenBuilding[];
  maintenance: MasterScreenMaintenance[];
}

interface MasterScreenPropertiesRepositoryOptions {
  databaseClient: DatabaseClient;
  buildings: MasterScreenBuilding[];
  maintenances: MasterScreenMaintenance[];
}

export class MasterScreenPropertiesRepository extends BaseSeededRepository {
  private readonly buildings: MasterScreenBuilding[];
  private readonly maintenances: MasterScreenMaintenance[];

  constructor({
    databaseClient,
    buildings,
    maintenances,
  }: MasterScreenPropertiesRepositoryOptions) {
    super(databaseClient);
    this.buildings = buildings;
    this.maintenances = maintenances;
  }

  async ensureSeedData(): Promise<void> {
    await Promise.all([
      this.ensureCollectionSeedData(COLLECTION_NAMES.BUILDINGS, this.buildings),
      this.ensureCollectionSeedData(COLLECTION_NAMES.MAINTENANCES, this.maintenances),
    ]);
  }

  async findPropertiesData(): Promise<MasterScreenPropertiesData> {
    const [buildings, maintenance] = await Promise.all([
      this.findAllFromCollection<MasterScreenBuilding>(COLLECTION_NAMES.BUILDINGS),
      this.findAllFromCollection<MasterScreenMaintenance>(COLLECTION_NAMES.MAINTENANCES),
    ]);

    return { buildings, maintenance };
  }
}
