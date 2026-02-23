import { fetchApiJson } from "./apiClient";
import { resolveLocale } from "./i18n/locales";

const EMPTY_MAGIC_ITEMS_RESPONSE = {
  items: [],
  total: 0,
  limit: 0,
  offset: 0,
};

const EMPTY_RANDOM_STOCK_RESPONSE = {
  seed: "",
  totalPool: 0,
  merchant: null,
  items: [],
  limit: 10,
};

export async function getMagicItems(locale, options = {}) {
  const safeLocale = resolveLocale(locale);
  const searchParams = new URLSearchParams();

  searchParams.set("locale", safeLocale);

  if (typeof options.q === "string" && options.q.trim().length > 0) {
    searchParams.set("q", options.q.trim());
  }

  if (typeof options.rarity === "string" && options.rarity.trim().length > 0) {
    searchParams.set("rarity", options.rarity.trim());
  }

  if (typeof options.type === "string" && options.type.trim().length > 0) {
    searchParams.set("type", options.type.trim());
  }

  if (options.attunement === "required" || options.attunement === "not-required") {
    searchParams.set("attunement", options.attunement);
  }

  if (options.status === "active" || options.status === "inactive") {
    searchParams.set("status", options.status);
  }

  if (Number.isInteger(options.limit) && options.limit > 0) {
    searchParams.set("limit", String(options.limit));
  }

  if (Number.isInteger(options.offset) && options.offset >= 0) {
    searchParams.set("offset", String(options.offset));
  }

  return fetchApiJson(
    `/api/magic-items?${searchParams.toString()}`,
    EMPTY_MAGIC_ITEMS_RESPONSE,
  );
}

export async function getRandomMagicStock(locale, options = {}) {
  const safeLocale = resolveLocale(locale);
  const searchParams = new URLSearchParams();
  searchParams.set("locale", safeLocale);

  if (Number.isInteger(options.limit) && options.limit > 0) {
    searchParams.set("limit", String(Math.min(options.limit, 10)));
  }

  if (options.status === "active" || options.status === "inactive") {
    searchParams.set("status", options.status);
  }

  if (typeof options.seed === "string" && options.seed.trim().length > 0) {
    searchParams.set("seed", options.seed.trim());
  }

  return fetchApiJson(
    `/api/magic-items/random-stock?${searchParams.toString()}`,
    EMPTY_RANDOM_STOCK_RESPONSE,
  );
}
