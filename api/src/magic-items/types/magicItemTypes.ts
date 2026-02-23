import type { SupportedLocale } from "../../master-screen/utils/locale";

export interface MagicItemDocument {
  canonicalId: string;
  status: "active" | "inactive";
  nameEn: string;
  nameFr: string;
  voName?: string | null;
  type?: string | null;
  rarity?: string | null;
  requiresAttunement?: boolean | null;
  attunementTextEn?: string | null;
  attunementTextFr?: string | null;
  descriptionEn?: string | null;
  descriptionFr?: string | null;
  sourceBook?: string | null;
  itemUrlEn?: string | null;
  itemUrlFr?: string | null;
  imageUrlEn?: string | null;
  imageUrlFr?: string | null;
  keywordsEn?: string[];
  keywordsFr?: string[];
  sourceRowHash?: string | null;
  sortOrder: number;
}

export interface LocalizedMagicItem {
  canonicalId: string;
  status: "active" | "inactive";
  name: string;
  voName: string | null;
  type: string | null;
  rarity: string | null;
  requiresAttunement: boolean | null;
  attunementText: string | null;
  description: string | null;
  descriptionFallbackUsed: boolean;
  descriptionLocaleUsed: SupportedLocale | null;
  sourceBook: string | null;
  itemUrl: string | null;
  itemUrlFallbackUsed: boolean;
  itemUrlLocaleUsed: SupportedLocale | null;
  imageUrl: string | null;
  imageFallbackUsed: boolean;
  imageLocaleUsed: SupportedLocale | null;
  keywords: string[];
}

export interface MagicItemListQuery {
  locale: SupportedLocale;
  q: string;
  rarity: string | null;
  type: string | null;
  attunement: "required" | "not-required" | null;
  status: "active" | "inactive" | null;
  limit: number;
  offset: number;
}

export interface MagicItemRandomStockQuery {
  locale: SupportedLocale;
  status: "active" | "inactive" | null;
  limit: number;
  seed: string;
}

export interface MagicItemMerchant {
  name: string;
  ancestry: string;
  reputation: "trusted" | "shady";
  description: string;
}

export interface MagicItemPricedEntry {
  item: LocalizedMagicItem;
  buyPriceGp: number;
  rentPriceGp: number;
}

export interface MagicItemRandomStockResult {
  seed: string;
  totalPool: number;
  merchant: MagicItemMerchant;
  items: MagicItemPricedEntry[];
}

export interface RawListingItem {
  lang: SupportedLocale;
  name: string;
  voName: string | null;
  type: string | null;
  rarity: string | null;
  requiresAttunement: boolean | null;
  attunementText: string | null;
  sourceBook: string | null;
  itemUrl: string | null;
}
