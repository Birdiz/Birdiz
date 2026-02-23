import type { SupportedLocale } from "../../master-screen/utils/locale";
import type { MagicItemRepository } from "../repositories/magicItemRepository";
import type {
  LocalizedMagicItem,
  MagicItemDocument,
  MagicItemListQuery,
  MagicItemMerchant,
  MagicItemRandomStockQuery,
  MagicItemRandomStockResult,
} from "../types/magicItemTypes";

export interface MagicItemListResult {
  items: LocalizedMagicItem[];
  total: number;
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function includesQuery(item: LocalizedMagicItem, query: string): boolean {
  if (!query) {
    return true;
  }

  const haystack = [
    item.name,
    item.voName ?? "",
    item.type ?? "",
    item.rarity ?? "",
    item.description ?? "",
    ...item.keywords,
  ]
    .join(" ");

  return normalize(haystack).includes(query);
}

function applyFilters(
  item: LocalizedMagicItem,
  query: MagicItemListQuery,
): boolean {
  if (query.status && item.status !== query.status) {
    return false;
  }

  if (query.rarity && item.rarity?.toLowerCase() !== query.rarity.toLowerCase()) {
    return false;
  }

  if (query.type && item.type?.toLowerCase() !== query.type.toLowerCase()) {
    return false;
  }

  if (query.attunement === "required" && item.requiresAttunement !== true) {
    return false;
  }

  if (query.attunement === "not-required" && item.requiresAttunement !== false) {
    return false;
  }

  return includesQuery(item, query.q);
}

function createSeededRandom(seed: string): () => number {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  let state = hash >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let temp = state;
    temp = Math.imul(temp ^ (temp >>> 15), temp | 1);
    temp ^= temp + Math.imul(temp ^ (temp >>> 7), temp | 61);

    return ((temp ^ (temp >>> 14)) >>> 0) / 4294967296;
  };
}

function randomIntInRange(
  random: () => number,
  minimum: number,
  maximum: number,
): number {
  return Math.floor(random() * (maximum - minimum + 1)) + minimum;
}

function toRarityBand(rarity: string | null): { min: number; max: number } {
  const normalized = normalize((rarity ?? "").replace(/\s+/g, ""));

  switch (normalized) {
    case "common":
      return { min: 50, max: 100 };
    case "uncommon":
    case "peucommun":
      return { min: 101, max: 500 };
    case "rare":
      return { min: 501, max: 5000 };
    case "veryrare":
    case "tresrare":
      return { min: 5001, max: 50000 };
    case "legendary":
    case "legendaire":
      return { min: 50001, max: 250000 };
    case "artifact":
    case "artefact":
      return { min: 250001, max: 500000 };
    default:
      return { min: 75, max: 600 };
  }
}

function buildMerchant(
  locale: SupportedLocale,
  random: () => number,
): MagicItemMerchant {
  const names =
    locale === "fr"
      ? ["Aelric", "Brynna", "Corvin", "Maelis", "Thoren", "Ysilde"]
      : ["Aelric", "Brynna", "Corvin", "Maelis", "Thoren", "Ysilde"];
  const ancestries =
    locale === "fr"
      ? ["humain", "elfe", "nain", "gnome", "tieffelin", "drakéide"]
      : ["human", "elf", "dwarf", "gnome", "tiefling", "dragonborn"];
  const reputation: MagicItemMerchant["reputation"] =
    random() < 0.55 ? "trusted" : "shady";
  const name = names[randomIntInRange(random, 0, names.length - 1)];
  const ancestry = ancestries[randomIntInRange(random, 0, ancestries.length - 1)];
  const description =
    locale === "fr"
      ? reputation === "trusted"
        ? `${name}, ${ancestry}, est connu pour des prix honnêtes et des recommandations fiables.`
        : `${name}, ${ancestry}, a la réputation de gonfler ses prix lorsque la demande monte.`
      : reputation === "trusted"
        ? `${name}, a ${ancestry}, is known for fair prices and dependable advice.`
        : `${name}, a ${ancestry}, has a reputation for raising prices when demand spikes.`;

  return {
    name,
    ancestry,
    reputation,
    description,
  };
}

function randomSample<T>(items: T[], sampleSize: number, random: () => number): T[] {
  const copy = [...items];
  const sample: T[] = [];

  while (sample.length < sampleSize && copy.length > 0) {
    const index = randomIntInRange(random, 0, copy.length - 1);
    sample.push(copy[index]);
    copy.splice(index, 1);
  }

  return sample;
}

export class MagicItemService {
  private readonly magicItemRepository: MagicItemRepository;

  constructor(magicItemRepository: MagicItemRepository) {
    this.magicItemRepository = magicItemRepository;
  }

  async getMagicItems(query: MagicItemListQuery): Promise<MagicItemListResult> {
    await this.magicItemRepository.ensureSeedData();

    const items = await this.magicItemRepository.findAll();
    const localized = items.map((item) => this.localizeItem(item, query.locale));
    const normalizedQuery = normalize(query.q);

    const filtered = localized.filter((item) =>
      applyFilters(item, { ...query, q: normalizedQuery }),
    );

    return {
      total: filtered.length,
      items: filtered.slice(query.offset, query.offset + query.limit),
    };
  }

  async getMagicItemByCanonicalId(
    canonicalId: string,
    locale: MagicItemListQuery["locale"],
  ): Promise<LocalizedMagicItem | null> {
    await this.magicItemRepository.ensureSeedData();

    const item = await this.magicItemRepository.findByCanonicalId(canonicalId);

    if (!item) {
      return null;
    }

    return this.localizeItem(item, locale);
  }

  async getRandomStock(
    query: MagicItemRandomStockQuery,
  ): Promise<MagicItemRandomStockResult> {
    await this.magicItemRepository.ensureSeedData();

    const items = await this.magicItemRepository.findAll();
    const localized = items.map((item) => this.localizeItem(item, query.locale));
    const availableItems = localized.filter((item) =>
      applyFilters(item, {
        locale: query.locale,
        q: "",
        rarity: null,
        type: null,
        attunement: null,
        status: query.status,
        limit: query.limit,
        offset: 0,
      }),
    );
    const random = createSeededRandom(query.seed);
    const merchant = buildMerchant(query.locale, random);
    const limitedCount = Math.min(query.limit, 10, availableItems.length);
    const selectedItems = randomSample(availableItems, limitedCount, random);

    const pricedEntries = selectedItems.map((item) => {
      const band = toRarityBand(item.rarity);
      const basePrice = randomIntInRange(random, band.min, band.max);
      const multiplier =
        merchant.reputation === "trusted"
          ? 0.88 + random() * 0.12
          : 1.05 + random() * 0.25;
      const buyPriceGp = Math.max(1, Math.round(basePrice * multiplier));
      const rentPriceGp = Math.max(1, Math.round(buyPriceGp * 0.1));

      return {
        item,
        buyPriceGp,
        rentPriceGp,
      };
    });

    return {
      seed: query.seed,
      totalPool: availableItems.length,
      merchant,
      items: pricedEntries,
    };
  }

  private localizeItem(
    item: MagicItemDocument,
    locale: MagicItemListQuery["locale"],
  ): LocalizedMagicItem {
    const isEnglish = locale === "en";
    const primaryDescription = isEnglish ? item.descriptionEn : item.descriptionFr;
    const fallbackDescription = isEnglish ? item.descriptionFr : item.descriptionEn;
    const resolvedDescription = primaryDescription ?? fallbackDescription ?? null;
    const descriptionFallbackUsed =
      resolvedDescription !== null &&
      primaryDescription == null &&
      fallbackDescription != null;
    const descriptionLocaleUsed =
      resolvedDescription == null
        ? null
        : descriptionFallbackUsed
          ? isEnglish
            ? "fr"
            : "en"
          : locale;
    const primaryItemUrl = isEnglish ? item.itemUrlEn : item.itemUrlFr;
    const fallbackItemUrl = isEnglish ? item.itemUrlFr : item.itemUrlEn;
    const resolvedItemUrl = primaryItemUrl ?? fallbackItemUrl ?? null;
    const itemUrlFallbackUsed =
      resolvedItemUrl !== null && primaryItemUrl == null && fallbackItemUrl != null;
    const itemUrlLocaleUsed =
      resolvedItemUrl == null
        ? null
        : itemUrlFallbackUsed
          ? isEnglish
            ? "fr"
            : "en"
          : locale;
    const primaryImage = isEnglish ? item.imageUrlEn : item.imageUrlFr;
    const fallbackImage = isEnglish ? item.imageUrlFr : item.imageUrlEn;
    const resolvedImageUrl = primaryImage ?? fallbackImage ?? null;
    const imageFallbackUsed =
      resolvedImageUrl !== null && primaryImage == null && fallbackImage != null;
    const imageLocaleUsed =
      resolvedImageUrl == null ? null : imageFallbackUsed ? (isEnglish ? "fr" : "en") : locale;

    return {
      canonicalId: item.canonicalId,
      status: item.status,
      name: isEnglish ? item.nameEn : item.nameFr,
      voName: item.voName ?? null,
      type: item.type ?? null,
      rarity: item.rarity ?? null,
      requiresAttunement: item.requiresAttunement ?? null,
      attunementText: isEnglish
        ? item.attunementTextEn ?? item.attunementTextFr ?? null
        : item.attunementTextFr ?? item.attunementTextEn ?? null,
      description: resolvedDescription,
      descriptionFallbackUsed,
      descriptionLocaleUsed,
      sourceBook: item.sourceBook ?? null,
      itemUrl: resolvedItemUrl,
      itemUrlFallbackUsed,
      itemUrlLocaleUsed,
      imageUrl: resolvedImageUrl,
      imageFallbackUsed,
      imageLocaleUsed,
      keywords: isEnglish
        ? item.keywordsEn ?? item.keywordsFr ?? []
        : item.keywordsFr ?? item.keywordsEn ?? [],
    };
  }
}
