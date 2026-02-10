import type { SupportedLocale } from "./locale";

const CURRENCY_LABELS_EN: Record<string, string> = {
  PC: "CP",
  PA: "SP",
  PO: "GP",
  PP: "PP",
};

export function localizeCurrencyUnits(
  value: string,
  locale: SupportedLocale,
): string {
  if (locale !== "en") {
    return value;
  }

  return value.replace(/(?<![A-Z])(PC|PA|PO|PP)(?![A-Z])/g, (match) => {
    return CURRENCY_LABELS_EN[match] ?? match;
  });
}
