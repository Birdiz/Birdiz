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
import { getLocalizedName } from "../utils/localization";

export class MasterScreenPropertiesService {
  private readonly masterScreenPropertiesRepository: MasterScreenPropertiesRepository;

  constructor(masterScreenPropertiesRepository: MasterScreenPropertiesRepository) {
    this.masterScreenPropertiesRepository = masterScreenPropertiesRepository;
  }

  async getPropertiesData(
    locale: SupportedLocale = "fr",
  ): Promise<MasterScreenPropertiesData> {
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
