import type {
  MasterScreenPropertiesData,
  MasterScreenPropertiesRepository,
} from "../repositories/masterScreenPropertiesRepository";
import type {
  MasterScreenBuilding,
  MasterScreenMaintenance,
} from "../data/masterScreenBuildings";
import { localizeCurrencyUnits } from "../utils/currency";
import type { SupportedLocale } from "../utils/locale";

function getLocalizedName(
  locale: SupportedLocale,
  entry: { name?: string; nameEn?: string; nameFr?: string },
): string {
  if (locale === "en") {
    return entry.nameEn ?? entry.name ?? entry.nameFr ?? "";
  }

  return entry.nameFr ?? entry.name ?? entry.nameEn ?? "";
}

export class MasterScreenPropertiesService {
  private readonly masterScreenPropertiesRepository: MasterScreenPropertiesRepository;

  constructor(masterScreenPropertiesRepository: MasterScreenPropertiesRepository) {
    this.masterScreenPropertiesRepository = masterScreenPropertiesRepository;
  }

  async getPropertiesData(
    locale: SupportedLocale = "fr",
  ): Promise<MasterScreenPropertiesData> {
    await this.masterScreenPropertiesRepository.ensureSeedData();

    const propertiesData = await this.masterScreenPropertiesRepository.findPropertiesData();

    return {
      buildings: propertiesData.buildings.map((building) =>
        this.localizeBuilding(building, locale),
      ),
      maintenance: propertiesData.maintenance.map((maintenance) =>
        this.localizeMaintenance(maintenance, locale),
      ),
    };
  }

  private localizeBuilding(
    building: MasterScreenBuilding,
    locale: SupportedLocale,
  ): MasterScreenBuilding {
    return {
      ...building,
      name: getLocalizedName(locale, building),
      price: localizeCurrencyUnits(building.price, locale),
      rent: localizeCurrencyUnits(building.rent, locale),
    };
  }

  private localizeMaintenance(
    maintenance: MasterScreenMaintenance,
    locale: SupportedLocale,
  ): MasterScreenMaintenance {
    return {
      ...maintenance,
      name: getLocalizedName(locale, maintenance),
      cost: localizeCurrencyUnits(maintenance.cost, locale),
    };
  }
}
