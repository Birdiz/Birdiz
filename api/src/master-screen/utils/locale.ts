export type SupportedLocale = "en" | "fr";

export function resolveLocale(rawLocale: unknown): SupportedLocale {
  return rawLocale === "en" ? "en" : "fr";
}
