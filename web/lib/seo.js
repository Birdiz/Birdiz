import { getIntl } from "./i18n/intl";
import { resolveLocale, SUPPORTED_LOCALES } from "./i18n/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ddbuilder.fr";

function buildAlternateLanguages(pathname) {
  const entries = SUPPORTED_LOCALES.map((locale) => [
    locale,
    `${SITE_URL}/${locale}${pathname === "/" ? "" : pathname}`,
  ]);

  return {
    ...Object.fromEntries(entries),
    "x-default": `${SITE_URL}/en${pathname === "/" ? "" : pathname}`,
  };
}

export function getSiteUrl() {
  return SITE_URL;
}

export function buildSeoMetadata({ locale, pathname = "/", titleId, descriptionId }) {
  const safeLocale = resolveLocale(locale);
  const intl = getIntl(safeLocale);

  const title = intl.formatMessage({ id: titleId });
  const description = intl.formatMessage({ id: descriptionId });
  const siteName = intl.formatMessage({ id: "seo.siteName" });
  const localeTag = intl.formatMessage({ id: "seo.locale" });
  const canonical = `${SITE_URL}/${safeLocale}${pathname === "/" ? "" : pathname}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildAlternateLanguages(pathname),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: localeTag,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function createGenerateMetadata({ pathname = "/", titleId, descriptionId }) {
  return async function generateMetadata({ params }) {
    const { locale } = await params;

    return buildSeoMetadata({
      locale,
      pathname,
      titleId,
      descriptionId,
    });
  };
}
