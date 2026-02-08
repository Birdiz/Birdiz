import HomeShell from "../../components/home-shell";
import MasterScreenDashboard from "../../components/master-screen/master-screen-dashboard";
import PageHero from "../../components/ui/page-hero";
import { homeContent } from "../../lib/homeContent";
import {
  getMasterScreenDamages,
  getMasterScreenLifestyles,
  getMasterScreenProperties,
  getMasterScreenTransport,
} from "../../lib/masterScreenData";

export default async function MasterScreenPage() {
  const [damages, transport, properties, lifestyles] = await Promise.all([
    getMasterScreenDamages(),
    getMasterScreenTransport(),
    getMasterScreenProperties(),
    getMasterScreenLifestyles(),
  ]);

  return (
    <HomeShell content={homeContent}>
      <PageHero
        eyebrow="Master Screen"
        title="In-session references for high-velocity decisions"
        description="This screen groups practical economics and world interaction references so DMs and players can keep momentum while resolving outcomes."
        badges={["Combat support", "Travel and economy", "Roleplay pacing"]}
        art="Pick a domain card to focus one data module at a time, then resolve outcomes without scanning through long stacked tables."
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
