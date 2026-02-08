import type {
  MasterScreenDamageDocument,
  MasterScreenDamageRepository,
} from "../repositories/masterScreenDamageRepository";
import type { SupportedLocale } from "../utils/locale";

export interface MasterScreenLocalizedDamage {
  die: string;
  examples: string[];
  sortOrder: number;
}

export class MasterScreenDamageService {
  private readonly masterScreenDamageRepository: MasterScreenDamageRepository;

  constructor(masterScreenDamageRepository: MasterScreenDamageRepository) {
    this.masterScreenDamageRepository = masterScreenDamageRepository;
  }

  async getDamages(
    locale: SupportedLocale = "fr",
  ): Promise<MasterScreenLocalizedDamage[]> {
    await this.masterScreenDamageRepository.ensureSeedData();

    const damages = await this.masterScreenDamageRepository.findAll();

    return damages.map((damage) => this.localizeDamage(damage, locale));
  }

  private localizeDamage(
    damage: MasterScreenDamageDocument,
    locale: SupportedLocale,
  ): MasterScreenLocalizedDamage {
    const examplesFr = damage.examplesFr ?? damage.examples ?? [];
    const examplesEn = damage.examplesEn ?? examplesFr;

    return {
      die: damage.die,
      examples: locale === "en" ? examplesEn : examplesFr,
      sortOrder: damage.sortOrder,
    };
  }
}
