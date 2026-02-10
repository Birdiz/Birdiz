import type { DatabaseClient } from "../../db/mongoClient";
import type { MasterScreenLifestyle } from "../data/masterScreenLifestyles";
import { BaseSeededRepository } from "./baseSeededRepository";

interface MasterScreenLifestyleRepositoryOptions {
  databaseClient: DatabaseClient;
  lifestyles: MasterScreenLifestyle[];
}

export class MasterScreenLifestyleRepository extends BaseSeededRepository {
  private readonly lifestyles: MasterScreenLifestyle[];

  constructor({
    databaseClient,
    lifestyles,
  }: MasterScreenLifestyleRepositoryOptions) {
    super(databaseClient);
    this.lifestyles = lifestyles;
  }

  async ensureSeedData(): Promise<void> {
    await this.ensureCollectionSeedData("master_screen_lifestyles", this.lifestyles);
  }

  async findAll(): Promise<MasterScreenLifestyle[]> {
    return this.findAllFromCollection<MasterScreenLifestyle>(
      "master_screen_lifestyles",
    );
  }

  protected createLocalizationBackfillPayload(
    entry: Record<string, unknown>,
  ): Record<string, unknown> {
    const services = Array.isArray(entry.services) ? entry.services : [];
    const localizedServices = services.map((service) => {
      const serviceRecord = service as Record<string, unknown>;

      return {
        ...serviceRecord,
        nameEn: serviceRecord.nameEn ?? serviceRecord.name,
        nameFr: serviceRecord.nameFr ?? serviceRecord.name,
      };
    });

    return {
      nameEn: entry.nameEn ?? entry.name,
      nameFr: entry.nameFr ?? entry.name,
      descriptionEn: entry.descriptionEn ?? entry.description,
      descriptionFr: entry.descriptionFr ?? entry.description,
      services: localizedServices,
    };
  }
}
