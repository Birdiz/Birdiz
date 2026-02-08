import { DEFAULT_LOCALE } from "./locales";
import { enMessages } from "./messages.en";
import { frMessages } from "./messages.fr";

export const messages = {
  en: enMessages,
  fr: frMessages,
};

export function getMessages(locale) {
  return messages[locale] ?? messages[DEFAULT_LOCALE];
}
