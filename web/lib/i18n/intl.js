import { createIntl, createIntlCache } from "react-intl";
import { getMessages } from "./messages";
import { resolveLocale } from "./locales";

const cache = createIntlCache();

export function getIntl(locale) {
  const safeLocale = resolveLocale(locale);

  return createIntl(
    {
      locale: safeLocale,
      messages: getMessages(safeLocale),
      defaultLocale: "en",
    },
    cache,
  );
}
