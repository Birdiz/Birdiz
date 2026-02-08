import { createIntl, createIntlCache } from "react-intl";
import { getMessages } from "./messages";

const cache = createIntlCache();

export function getIntl(locale) {
  return createIntl(
    {
      locale,
      messages: getMessages(locale),
      defaultLocale: "en",
    },
    cache,
  );
}
