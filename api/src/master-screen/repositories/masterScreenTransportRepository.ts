import type { DatabaseClient } from "../../db/mongoClient";
import type {
  MasterScreenBoat,
  MasterScreenMount,
  MasterScreenMountEquipment,
} from "../data/masterScreenTransport";
import { BaseSeededRepository } from "./baseSeededRepository";
import { COLLECTION_NAMES } from "../constants/collectionNames";

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

export class MasterScreenTransportRepository extends BaseSeededRepository {
  private readonly boats: MasterScreenBoat[];
  private readonly mounts: MasterScreenMount[];
  private readonly mountEquipments: MasterScreenMountEquipment[];

  constructor({
    databaseClient,
    boats,
    mounts,
    mountEquipments,
  }: MasterScreenTransportRepositoryOptions) {
    super(databaseClient);
    this.boats = boats;
    this.mounts = mounts;
    this.mountEquipments = mountEquipments;
  }

  async ensureSeedData(): Promise<void> {
    await Promise.all([
      this.ensureCollectionSeedData(COLLECTION_NAMES.BOATS, this.boats),
      this.ensureCollectionSeedData(COLLECTION_NAMES.MOUNTS, this.mounts),
      this.ensureCollectionSeedData(COLLECTION_NAMES.MOUNT_EQUIPMENTS, this.mountEquipments),
    ]);
  }

  async findTransportData(): Promise<MasterScreenTransportData> {
    const [boats, mounts, mountEquipments] = await Promise.all([
      this.findAllFromCollection<MasterScreenBoat>(COLLECTION_NAMES.BOATS),
      this.findAllFromCollection<MasterScreenMount>(COLLECTION_NAMES.MOUNTS),
      this.findAllFromCollection<MasterScreenMountEquipment>(COLLECTION_NAMES.MOUNT_EQUIPMENTS),
    ]);

    return { boats, mounts, mountEquipments };
  }
}
