import type { DatabaseClient } from "../../db/mongoClient";
import type {
  MasterScreenBuilding,
  MasterScreenMaintenance,
} from "../data/masterScreenBuildings";
import { BaseSeededRepository } from "./baseSeededRepository";

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
      this.ensureCollectionSeedData("master_screen_buildings", this.buildings),
      this.ensureCollectionSeedData(
        "master_screen_maintenances",
        this.maintenances,
      ),
    ]);
  }

  async findPropertiesData(): Promise<MasterScreenPropertiesData> {
    const [buildings, maintenance] = await Promise.all([
      this.findAllFromCollection<MasterScreenBuilding>("master_screen_buildings"),
      this.findAllFromCollection<MasterScreenMaintenance>(
        "master_screen_maintenances",
      ),
    ]);

    return { buildings, maintenance };
  }
}
