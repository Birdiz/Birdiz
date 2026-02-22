import type {
  MasterScreenTransportData,
  MasterScreenTransportRepository,
} from "../repositories/masterScreenTransportRepository";
import type {
  MasterScreenBoat,
  MasterScreenMount,
  MasterScreenMountEquipment,
} from "../data/masterScreenTransport";
import { localizeCurrencyUnits } from "../utils/currency";
import type { SupportedLocale } from "../utils/locale";
import { getLocalizedName } from "../utils/localization";

export class MasterScreenTransportService {
  private readonly masterScreenTransportRepository: MasterScreenTransportRepository;

  constructor(masterScreenTransportRepository: MasterScreenTransportRepository) {
    this.masterScreenTransportRepository = masterScreenTransportRepository;
  }

  async getTransportData(locale: SupportedLocale = "fr"): Promise<MasterScreenTransportData> {
    const transportData = await this.masterScreenTransportRepository.findTransportData();

    return {
      boats: transportData.boats.map((boat) => this.localizeBoat(boat, locale)),
      mounts: transportData.mounts.map((mount) => this.localizeMount(mount, locale)),
      mountEquipments: transportData.mountEquipments.map((equipment) =>
        this.localizeMountEquipment(equipment, locale),
      ),
    };
  }

  private localizeBoat(
    boat: MasterScreenBoat,
    locale: SupportedLocale,
  ): MasterScreenBoat {
    return {
      ...boat,
      name: getLocalizedName(locale, boat),
      price: localizeCurrencyUnits(boat.price, locale),
      rent: localizeCurrencyUnits(boat.rent, locale),
    };
  }

  private localizeMount(
    mount: MasterScreenMount,
    locale: SupportedLocale,
  ): MasterScreenMount {
    return {
      ...mount,
      name: getLocalizedName(locale, mount),
      price: localizeCurrencyUnits(mount.price, locale),
      rent: localizeCurrencyUnits(mount.rent, locale),
    };
  }

  private localizeMountEquipment(
    equipment: MasterScreenMountEquipment,
    locale: SupportedLocale,
  ): MasterScreenMountEquipment {
    return {
      ...equipment,
      name: getLocalizedName(locale, equipment),
      price: localizeCurrencyUnits(equipment.price, locale),
    };
  }
}
