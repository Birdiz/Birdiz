import type { SupportedLocale } from "./locale";

export function getLocalizedName(
  locale: SupportedLocale,
  entry: { name?: string; nameEn?: string; nameFr?: string },
): string {
  if (locale === "en") {
    return entry.nameEn ?? entry.name ?? entry.nameFr ?? "";
  }

  return entry.nameFr ?? entry.name ?? entry.nameEn ?? "";
}

export function getLocalizedDescription(
  locale: SupportedLocale,
  entry: { description?: string; descriptionEn?: string; descriptionFr?: string },
): string {
  if (locale === "en") {
    return entry.descriptionEn ?? entry.description ?? entry.descriptionFr ?? "";
  }

  return entry.descriptionFr ?? entry.description ?? entry.descriptionEn ?? "";
}
