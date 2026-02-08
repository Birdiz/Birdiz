import { notFound } from "next/navigation";
import LocaleIntlProvider from "../../components/i18n/intl-provider";
import { getMessages } from "../../lib/i18n/messages";
import { isSupportedLocale, SUPPORTED_LOCALES } from "../../lib/i18n/locales";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <LocaleIntlProvider locale={locale} messages={getMessages(locale)}>
      {children}
    </LocaleIntlProvider>
  );
}
