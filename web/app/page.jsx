import HomeShell from "../components/home-shell";
import PageHero from "../components/ui/page-hero";
import SectionPanel from "../components/ui/section-panel";
import ToolCard from "../components/ui/tool-card";
import { homeContent } from "../lib/homeContent";

export default function HomePage() {
  return (
    <HomeShell content={homeContent}>
      <PageHero
        eyebrow={homeContent.hero.eyebrow}
        title={homeContent.hero.title}
        description={homeContent.hero.description}
        badges={homeContent.hero.badges}
        art={homeContent.hero.art}
      />

      <SectionPanel title="Intentions" subtitle="Scope and player value">
        <ul className="m-0 grid gap-2 p-0 md:grid-cols-3">
          {homeContent.intentions.map((intention) => (
            <li
              key={intention}
              className="list-none rounded-[12px] border border-[var(--line)] bg-[rgba(19,14,11,0.7)] px-3 py-3 text-sm leading-6 text-[var(--text-soft)]"
            >
              {intention}
            </li>
          ))}
        </ul>
      </SectionPanel>

      <SectionPanel title="Tool Modules" subtitle="Current and planned utilities">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {homeContent.toolGroups.map((group) => (
            <ToolCard
              key={group.title}
              title={group.title}
              description={group.description}
              href={group.href}
              status={group.status}
              meta={group.meta}
            />
          ))}
        </div>
      </SectionPanel>
    </HomeShell>
  );
}
