import HomeShell from "../../../components/home-shell";
import MasterScreenDashboard from "../../../components/master-screen/master-screen-dashboard";
import PageHero from "../../../components/ui/page-hero";
import { getHomeContent } from "../../../lib/homeContent";
import { getIntl } from "../../../lib/i18n/intl";
import { buildSeoMetadata } from "../../../lib/seo";
import {
  getMasterScreenDamages,
  getMasterScreenLifestyles,
  getMasterScreenProperties,
  getMasterScreenTransport,
} from "../../../lib/masterScreenData";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return buildSeoMetadata({
    locale,
    pathname: "/master-screen",
    titleId: "seo.masterScreen.title",
    descriptionId: "seo.masterScreen.description",
  });
}

export default async function LocalizedMasterScreenPage({ params }) {
  const { locale } = await params;
  const [damages, transport, properties, lifestyles] = await Promise.all([
    getMasterScreenDamages(locale),
    getMasterScreenTransport(),
    getMasterScreenProperties(),
    getMasterScreenLifestyles(),
  ]);

  const content = getHomeContent(locale);
  const intl = getIntl(locale);

  const hero = {
    eyebrow: intl.formatMessage({ id: "master.hero.eyebrow" }),
    title: intl.formatMessage({ id: "master.hero.title" }),
    description: intl.formatMessage({ id: "master.hero.description" }),
    badges: [
      intl.formatMessage({ id: "master.hero.badge1" }),
      intl.formatMessage({ id: "master.hero.badge2" }),
      intl.formatMessage({ id: "master.hero.badge3" }),
    ],
    art: intl.formatMessage({ id: "master.hero.art" }),
  };

  return (
    <HomeShell content={content} locale={locale}>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badges={hero.badges}
        art={hero.art}
      />

      <MasterScreenDashboard
        damages={damages}
        transport={transport}
        properties={properties}
        lifestyles={lifestyles}
      />
    </HomeShell>
  );
}
