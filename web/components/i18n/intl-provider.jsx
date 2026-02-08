"use client";

import { IntlProvider } from "react-intl";

export default function LocaleIntlProvider({ locale, messages, children }) {
  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}
