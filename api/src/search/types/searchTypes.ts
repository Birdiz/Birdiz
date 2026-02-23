import type { SupportedLocale } from "../../master-screen/utils/locale";

export const SEARCH_MODULES = [
  "master-screen",
  "navigation",
  "magic-items",
] as const;
export type SearchModule = (typeof SEARCH_MODULES)[number];

export const SEARCH_SECTIONS = [
  "home",
  "master-screen",
  "next-steps",
  "magic-trading-post",
  "damages",
  "transport",
  "properties",
  "lifestyles",
] as const;
export type SearchSection = (typeof SEARCH_SECTIONS)[number];

export const SEARCH_ENTITY_TYPES = [
  "page",
  "damage",
  "boat",
  "mount",
  "mount-equipment",
  "building",
  "maintenance",
  "lifestyle",
  "service",
  "magic-item",
] as const;
export type SearchEntityType = (typeof SEARCH_ENTITY_TYPES)[number];

export interface SearchDocument {
  id: string;
  locale: SupportedLocale;
  module: SearchModule;
  section: SearchSection;
  entityType: SearchEntityType;
  title: string;
  body: string;
  keywords: string[];
  href: string;
  anchor: string | null;
  weight: number;
  metadata: Record<string, string>;
}

export interface SearchQuery {
  q: string;
  locale: SupportedLocale;
  module: SearchModule | null;
  section: SearchSection | null;
  entityType: SearchEntityType | null;
  limit: number;
  offset: number;
}

export interface SearchResult extends SearchDocument {
  score: number;
}

export interface SearchFacetValue<TValue extends string> {
  value: TValue;
  count: number;
}

export interface SearchResponse {
  query: SearchQuery;
  total: number;
  results: SearchResult[];
  facets: {
    modules: SearchFacetValue<SearchModule>[];
    sections: SearchFacetValue<SearchSection>[];
    entityTypes: SearchFacetValue<SearchEntityType>[];
  };
}

export interface SearchDocumentProvider {
  getDocuments(locale: SupportedLocale): Promise<SearchDocument[]>;
}

export const DEFAULT_SEARCH_LIMIT = 20;
export const MAX_SEARCH_LIMIT = 50;
