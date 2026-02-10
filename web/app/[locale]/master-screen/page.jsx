import HomeShell from "../../../components/home-shell";
import MasterScreenDashboard from "../../../components/master-screen/master-screen-dashboard";
import PageHero from "../../../components/ui/page-hero";
import { getHomeContent } from "../../../lib/homeContent";
import { getIntl } from "../../../lib/i18n/intl";
import { createGenerateMetadata } from "../../../lib/seo";
import {
  getMasterScreenDamages,
  getMasterScreenLifestyles,
  getMasterScreenProperties,
  getMasterScreenTransport,
} from "../../../lib/masterScreenData";

const MASTER_SCREEN_SECTIONS = new Set([
  "damages",
  "transport",
  "properties",
  "lifestyles",
]);

function resolveInitialSection(rawSection) {
  const candidate = Array.isArray(rawSection) ? rawSection[0] : rawSection;
  if (typeof candidate !== "string") {
    return null;
  }

  return MASTER_SCREEN_SECTIONS.has(candidate) ? candidate : null;
}

export const generateMetadata = createGenerateMetadata({
  pathname: "/master-screen",
  titleId: "seo.masterScreen.title",
  descriptionId: "seo.masterScreen.description",
});
export default async function LocalizedMasterScreenPage({
  params,
  searchParams = {},
}) {
  const { locale } = await params;
  const nextSearchParams = /** @type {any} */ (await searchParams);
  const initialSection = resolveInitialSection(nextSearchParams.section);
  const [damages, transport, properties, lifestyles] = await Promise.all([
    getMasterScreenDamages(locale),
    getMasterScreenTransport(locale),
    getMasterScreenProperties(locale),
    getMasterScreenLifestyles(locale),
  ]);

  const content = getHomeContent(locale);
  const intl = getIntl(locale);

  const hero = {
    eyebrow: intl.formatMessage({ id: "master.hero.title" }),
    title: intl.formatMessage({ id: "master.hero.eyebrow" }),
    description: intl.formatMessage({ id: "master.hero.description" }),
    art: intl.formatMessage({ id: "master.hero.art" }),
    badges: [
      intl.formatMessage({ id: "master.hero.badge1" }),
      intl.formatMessage({ id: "master.hero.badge2" }),
      intl.formatMessage({ id: "master.hero.badge3" }),
    ],
    atmosphereImage: "/ambiance/master-atmosphere.svg",
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

      <MasterScreenDashboard
        damages={damages}
        transport={transport}
        properties={properties}
        lifestyles={lifestyles}
        initialSection={initialSection}
      />
    </HomeShell>
  );
}
