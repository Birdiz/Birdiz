import type { DatabaseClient } from "../../db/mongoClient";
import type {
  MasterScreenBoat,
  MasterScreenMount,
  MasterScreenMountEquipment,
} from "../data/masterScreenTransport";
import { BaseSeededRepository } from "./baseSeededRepository";

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
      this.findAllFromCollection<MasterScreenBoat>("master_screen_boats"),
      this.findAllFromCollection<MasterScreenMount>("master_screen_mounts"),
      this.findAllFromCollection<MasterScreenMountEquipment>(
        "master_screen_mount_equipments",
      ),
    ]);

    return { boats, mounts, mountEquipments };
  }
}
