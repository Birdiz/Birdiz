import HomeShell from "../../components/home-shell";
import PageHero from "../../components/ui/page-hero";
import SectionPanel from "../../components/ui/section-panel";
import { homeContent } from "../../lib/homeContent";

export default function NextStepsPage() {
  return (
    <HomeShell content={homeContent}>
      <PageHero
        eyebrow="Roadmap"
        title={homeContent.nextSteps.title}
        description={homeContent.nextSteps.description}
        badges={["Utility-first", "Incremental delivery", "Table feedback loop"]}
        art="Roadmap items are grouped by table impact, then delivered from fastest in-session value to deeper campaign preparation support."
      />

      <SectionPanel title="Milestones" subtitle="Execution order">
        <ol className="m-0 grid gap-3 p-0">
          {homeContent.nextSteps.milestones.map((milestone) => (
            <li
              key={milestone.name}
              className="list-none rounded-[14px] border border-[var(--line)] bg-[rgba(16,12,9,0.72)] p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="m-0 text-[var(--text-main)]">{milestone.name}</h4>
                <span className="tag-chip">{milestone.status}</span>
              </div>
              <p className="m-0 text-sm leading-6 text-[var(--text-soft)]">{milestone.detail}</p>
            </li>
          ))}
        </ol>
      </SectionPanel>
    </HomeShell>
  );
}
