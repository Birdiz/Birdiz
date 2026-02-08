import type { Collection } from "mongodb";
import type { DatabaseClient } from "../../db/mongoClient";
import type {
  MasterScreenBuilding,
  MasterScreenMaintenance,
} from "../data/masterScreenBuildings";

export interface MasterScreenPropertiesData {
  buildings: MasterScreenBuilding[];
  maintenance: MasterScreenMaintenance[];
}

interface MasterScreenPropertiesRepositoryOptions {
  databaseClient: DatabaseClient;
  buildings: MasterScreenBuilding[];
  maintenances: MasterScreenMaintenance[];
}

export class MasterScreenPropertiesRepository {
  private readonly databaseClient: DatabaseClient;
  private readonly buildings: MasterScreenBuilding[];
  private readonly maintenances: MasterScreenMaintenance[];

  constructor({
    databaseClient,
    buildings,
    maintenances,
  }: MasterScreenPropertiesRepositoryOptions) {
    this.databaseClient = databaseClient;
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
      this.findAll<MasterScreenBuilding>("master_screen_buildings"),
      this.findAll<MasterScreenMaintenance>("master_screen_maintenances"),
    ]);

    return { buildings, maintenance };
  }

  private async ensureCollectionSeedData(
    collectionName: string,
    seedData: object[],
  ): Promise<void> {
    const collection = await this.getCollection(collectionName);
    const totalDocuments = await collection.estimatedDocumentCount();

    if (totalDocuments > 0) {
      return;
    }

    await collection.insertMany(
      seedData.map((entry, index) => ({
        ...entry,
        sortOrder: index + 1,
      })),
    );
  }

  private async findAll<T>(collectionName: string): Promise<T[]> {
    const collection = await this.getCollection(collectionName);

    return collection
      .find({}, { projection: { _id: 0, sortOrder: 0 } })
      .sort({ sortOrder: 1 })
      .toArray() as Promise<T[]>;
  }

  private async getCollection(collectionName: string): Promise<Collection<object>> {
    const database = await this.databaseClient.getDatabase();

    return database.collection<object>(collectionName);
  }
}
