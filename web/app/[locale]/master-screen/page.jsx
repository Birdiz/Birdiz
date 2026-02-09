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

export const generateMetadata = createGenerateMetadata({
  pathname: "/master-screen",
  titleId: "seo.masterScreen.title",
  descriptionId: "seo.masterScreen.description",
});
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
    eyebrow: intl.formatMessage({ id: "master.hero.title" }),
    title: intl.formatMessage({ id: "master.hero.eyebrow" }),
    description: intl.formatMessage({ id: "master.hero.description" }),
    badges: [
      intl.formatMessage({ id: "master.hero.badge1" }),
      intl.formatMessage({ id: "master.hero.badge2" }),
      intl.formatMessage({ id: "master.hero.badge3" }),
    ],
  };

  return (
    <HomeShell content={content} locale={locale}>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        badges={hero.badges}
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
