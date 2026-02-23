import { SUPPORTED_LOCALES } from "../lib/i18n/locales";
import { getSiteUrl } from "../lib/seo";

const PATHS = ["", "/master-screen", "/magic-trading-post", "/next-steps"];

export default function sitemap() {
  const siteUrl = getSiteUrl();

  return SUPPORTED_LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
