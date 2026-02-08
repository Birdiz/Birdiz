import type { Collection } from "mongodb";
import type { DatabaseClient } from "../../db/mongoClient";
import type {
  MasterScreenBoat,
  MasterScreenMount,
  MasterScreenMountEquipment,
} from "../data/masterScreenTransport";

export interface MasterScreenTransportData {
  boats: MasterScreenBoat[];
  mounts: MasterScreenMount[];
  mountEquipments: MasterScreenMountEquipment[];
}

interface MasterScreenTransportRepositoryOptions {
  databaseClient: DatabaseClient;
  boats: MasterScreenBoat[];
  mounts: MasterScreenMount[];
  mountEquipments: MasterScreenMountEquipment[];
}

export class MasterScreenTransportRepository {
  private readonly databaseClient: DatabaseClient;
  private readonly boats: MasterScreenBoat[];
  private readonly mounts: MasterScreenMount[];
  private readonly mountEquipments: MasterScreenMountEquipment[];

  constructor({
    databaseClient,
    boats,
    mounts,
    mountEquipments,
  }: MasterScreenTransportRepositoryOptions) {
    this.databaseClient = databaseClient;
    this.boats = boats;
    this.mounts = mounts;
    this.mountEquipments = mountEquipments;
  }

  async ensureSeedData(): Promise<void> {
    await Promise.all([
      this.ensureCollectionSeedData("master_screen_boats", this.boats),
      this.ensureCollectionSeedData("master_screen_mounts", this.mounts),
      this.ensureCollectionSeedData(
        "master_screen_mount_equipments",
        this.mountEquipments,
      ),
    ]);
  }

  async findTransportData(): Promise<MasterScreenTransportData> {
    const [boats, mounts, mountEquipments] = await Promise.all([
      this.findAll<MasterScreenBoat>("master_screen_boats"),
      this.findAll<MasterScreenMount>("master_screen_mounts"),
      this.findAll<MasterScreenMountEquipment>("master_screen_mount_equipments"),
    ]);

    return { boats, mounts, mountEquipments };
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
