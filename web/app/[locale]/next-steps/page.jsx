import HomeShell from "../../../components/home-shell";
import PageHero from "../../../components/ui/page-hero";
import SectionPanel from "../../../components/ui/section-panel";
import { getHomeContent } from "../../../lib/homeContent";
import { createGenerateMetadata } from "../../../lib/seo";

export const generateMetadata = createGenerateMetadata({
  pathname: "/next-steps",
  titleId: "seo.roadmap.title",
  descriptionId: "seo.roadmap.description",
});

export default async function LocalizedNextStepsPage({ params }) {
  const { locale } = await params;
  const content = getHomeContent(locale);

  return (
    <HomeShell content={content} locale={locale}>
      <PageHero
        eyebrow={content.nextSteps.eyebrow}
        title={content.nextSteps.title}
        description={content.nextSteps.description}
        badges={content.nextSteps.badges}
        art={content.nextSteps.art}
      />

      <SectionPanel
        title={content.nextSteps.milestonesTitle}
        subtitle={content.nextSteps.milestonesSubtitle}
      >
        <ol className="m-0 grid gap-3 p-0">
          {content.nextSteps.milestones.map((milestone) => (
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
