import HomeShell from "../../../components/home-shell";
import MagicTradingPostDashboard from "../../../components/magic-items/magic-trading-post-dashboard";
import PageHero from "../../../components/ui/page-hero";
import { getHomeContent } from "../../../lib/homeContent";
import { getIntl } from "../../../lib/i18n/intl";
import { createGenerateMetadata } from "../../../lib/seo";
import { getMagicItems, getRandomMagicStock } from "../../../lib/magicItemsData";

export const generateMetadata = createGenerateMetadata({
  pathname: "/magic-trading-post",
  titleId: "seo.magicTradingPost.title",
  descriptionId: "seo.magicTradingPost.description",
});

function toSingleString(value) {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return typeof value === "string" ? value : "";
}

function parseFilters(searchParams) {
  const q = toSingleString(searchParams.q).trim();
  const rarity = toSingleString(searchParams.rarity).trim();
  const type = toSingleString(searchParams.type).trim();
  const attunement = toSingleString(searchParams.attunement).trim();

  return {
    q,
    rarity,
    type,
    attunement:
      attunement === "required" || attunement === "not-required"
        ? attunement
        : "",
  };
}

export default async function LocalizedMagicTradingPostPage({
  params,
  searchParams = {},
}) {
  const { locale } = await params;
  const nextSearchParams = /** @type {any} */ (await searchParams);
  const filters = parseFilters(nextSearchParams);
  const selectedItemId = toSingleString(nextSearchParams.item).trim();
  const rollSeed = toSingleString(nextSearchParams.roll).trim();
  const payload = await getMagicItems(locale, {
    q: filters.q,
    rarity: filters.rarity,
    type: filters.type,
    attunement: filters.attunement || null,
    status: "active",
    limit: 1000,
    offset: 0,
  });
  const randomStock = await getRandomMagicStock(locale, {
    status: "active",
    limit: 10,
    seed: rollSeed || undefined,
  });
  const items = payload.items || [];

  const selectedItem =
    items.find((item) => item.canonicalId === selectedItemId) || items[0] || null;

  const content = getHomeContent(locale);
  const intl = getIntl(locale);

  const hero = {
    eyebrow: intl.formatMessage({ id: "magic.hero.eyebrow" }),
    title: intl.formatMessage({ id: "magic.hero.title" }),
    description: intl.formatMessage({ id: "magic.hero.description" }),
    art: intl.formatMessage({ id: "magic.hero.art" }),
    badges: [
      intl.formatMessage({ id: "magic.hero.badge1" }),
      intl.formatMessage({ id: "magic.hero.badge2" }),
      intl.formatMessage({ id: "magic.hero.badge3" }),
    ],
    atmosphereImage: "/ambiance/master-atmosphere.svg",
  };

  const labels = {
    filters: {
      title: intl.formatMessage({ id: "magic.filters.title" }),
      subtitle: intl.formatMessage({ id: "magic.filters.subtitle" }),
      search: intl.formatMessage({ id: "magic.filters.search" }),
      searchPlaceholder: intl.formatMessage({ id: "magic.filters.searchPlaceholder" }),
      rarity: intl.formatMessage({ id: "magic.filters.rarity" }),
      anyRarity: intl.formatMessage({ id: "magic.filters.anyRarity" }),
      type: intl.formatMessage({ id: "magic.filters.type" }),
      anyType: intl.formatMessage({ id: "magic.filters.anyType" }),
      attunement: intl.formatMessage({ id: "magic.filters.attunement" }),
      anyAttunement: intl.formatMessage({ id: "magic.filters.anyAttunement" }),
      requiredAttunement: intl.formatMessage({ id: "magic.filters.requiredAttunement" }),
      notRequiredAttunement: intl.formatMessage({ id: "magic.filters.notRequiredAttunement" }),
      apply: intl.formatMessage({ id: "magic.filters.apply" }),
      reset: intl.formatMessage({ id: "magic.filters.reset" }),
    },
    list: {
      title: intl.formatMessage({ id: "magic.list.title" }),
      subtitle: (count) => intl.formatMessage({ id: "magic.list.subtitle" }, { count }),
      empty: intl.formatMessage({ id: "magic.list.empty" }),
      view: intl.formatMessage({ id: "magic.list.view" }),
    },
    details: {
      title: intl.formatMessage({ id: "magic.details.title" }),
      none: intl.formatMessage({ id: "magic.details.none" }),
      empty: intl.formatMessage({ id: "magic.details.empty" }),
    },
    attunement: {
      required: intl.formatMessage({ id: "magic.attunement.required" }),
      notRequired: intl.formatMessage({ id: "magic.attunement.notRequired" }),
      unknown: intl.formatMessage({ id: "magic.attunement.unknown" }),
    },
    meta: {
      type: intl.formatMessage({ id: "magic.meta.type" }),
      rarity: intl.formatMessage({ id: "magic.meta.rarity" }),
      attunement: intl.formatMessage({ id: "magic.meta.attunement" }),
      source: intl.formatMessage({ id: "magic.meta.source" }),
      none: intl.formatMessage({ id: "magic.meta.none" }),
      noDescription: intl.formatMessage({ id: "magic.meta.noDescription" }),
      openSource: intl.formatMessage({ id: "magic.meta.openSource" }),
      imageFallback: (localeUsed) =>
        intl.formatMessage({ id: "magic.meta.imageFallback" }, { locale: localeUsed || "-" }),
      linkFallback: (localeUsed) =>
        intl.formatMessage({ id: "magic.meta.linkFallback" }, { locale: localeUsed || "-" }),
      descriptionFallback: (localeUsed) =>
        intl.formatMessage({ id: "magic.meta.descriptionFallback" }, {
          locale: localeUsed || "-",
        }),
    },
    merchant: {
      title: intl.formatMessage({ id: "magic.merchant.title" }),
      subtitle: intl.formatMessage(
        { id: "magic.merchant.subtitle" },
        { count: randomStock.items?.length || 0 },
      ),
      reroll: intl.formatMessage({ id: "magic.merchant.reroll" }),
      reputation: {
        trusted: intl.formatMessage({ id: "magic.merchant.reputation.trusted" }),
        shady: intl.formatMessage({ id: "magic.merchant.reputation.shady" }),
      },
      buyPrice: intl.formatMessage({ id: "magic.merchant.buyPrice" }),
      rentPrice: intl.formatMessage({ id: "magic.merchant.rentPrice" }),
      gp: intl.formatMessage({ id: "magic.merchant.gp" }),
      empty: intl.formatMessage({ id: "magic.merchant.empty" }),
    },
  };

  return (
    <HomeShell content={content} locale={locale}>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badges={hero.badges}
        art={hero.art}
        backgroundImage={hero.atmosphereImage}
      />

      <MagicTradingPostDashboard
        locale={locale}
        items={items}
        selectedItem={selectedItem}
        filters={filters}
        labels={labels}
        randomStock={randomStock}
      />
    </HomeShell>
  );
}
