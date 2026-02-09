import type { Request } from "express";
import { resolveLocale } from "../../master-screen/utils/locale";
import {
  DEFAULT_SEARCH_LIMIT,
  MAX_SEARCH_LIMIT,
  SEARCH_ENTITY_TYPES,
  SEARCH_MODULES,
  SEARCH_SECTIONS,
  type SearchEntityType,
  type SearchModule,
  type SearchQuery,
  type SearchSection,
} from "../types/searchTypes";

function getStringQueryValue(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function parsePositiveInteger(rawValue: unknown, defaultValue: number): number {
  if (typeof rawValue !== "string" || rawValue.trim() === "") {
    return defaultValue;
  }

  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) {
    return defaultValue;
  }

  const safe = Math.floor(parsed);
  if (safe < 0) {
    return defaultValue;
  }

  return safe;
}

function parseFilter<TValue extends string>(
  value: unknown,
  allowedValues: readonly TValue[],
): TValue | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  if (normalized === "") {
    return null;
  }

  return allowedValues.includes(normalized as TValue)
    ? (normalized as TValue)
    : null;
}

export function parseSearchQuery(req: Request): SearchQuery {
  const limit = Math.min(
    parsePositiveInteger(req.query.limit, DEFAULT_SEARCH_LIMIT),
    MAX_SEARCH_LIMIT,
  );
  const offset = parsePositiveInteger(req.query.offset, 0);

  return {
    q: getStringQueryValue(req.query.q),
    locale: resolveLocale(req.query.locale),
    module: parseFilter<SearchModule>(req.query.module, SEARCH_MODULES),
    section: parseFilter<SearchSection>(req.query.section, SEARCH_SECTIONS),
    entityType: parseFilter<SearchEntityType>(
      req.query.entityType,
      SEARCH_ENTITY_TYPES,
    ),
    limit,
    offset,
  };
}
