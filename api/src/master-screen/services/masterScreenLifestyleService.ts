import type { MasterScreenLifestyle } from "../data/masterScreenLifestyles";
import type { MasterScreenLifestyleRepository } from "../repositories/masterScreenLifestyleRepository";
import { localizeCurrencyUnits } from "../utils/currency";
import type { SupportedLocale } from "../utils/locale";
import { getLocalizedName, getLocalizedDescription } from "../utils/localization";

export class MasterScreenLifestyleService {
  private readonly masterScreenLifestyleRepository: MasterScreenLifestyleRepository;

  constructor(masterScreenLifestyleRepository: MasterScreenLifestyleRepository) {
    this.masterScreenLifestyleRepository = masterScreenLifestyleRepository;
  }

  async getLifestyles(locale: SupportedLocale = "fr"): Promise<MasterScreenLifestyle[]> {
    const lifestyles = await this.masterScreenLifestyleRepository.findAll();

    return lifestyles.map((lifestyle) => this.localizeLifestyle(lifestyle, locale));
  }

  private localizeLifestyle(
    lifestyle: MasterScreenLifestyle,
    locale: SupportedLocale,
  ): MasterScreenLifestyle {
    return {
      ...lifestyle,
      name: getLocalizedName(locale, lifestyle),
      price: localizeCurrencyUnits(lifestyle.price, locale),
      description: getLocalizedDescription(locale, lifestyle),
      services: lifestyle.services.map((service) => ({
        ...service,
        name: getLocalizedName(locale, service),
        price: localizeCurrencyUnits(service.price, locale),
      })),
    };
  }
}
