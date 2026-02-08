export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "fr"];

export function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

export function resolveLocale(locale) {
  return locale === "fr" ? "fr" : DEFAULT_LOCALE;
}
