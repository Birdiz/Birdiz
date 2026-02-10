import HomeShell from "../../components/home-shell";
import PageHero from "../../components/ui/page-hero";
import SectionPanel from "../../components/ui/section-panel";
import ToolCard from "../../components/ui/tool-card";
import { getHomeContent } from "../../lib/homeContent";
import { createGenerateMetadata } from "../../lib/seo";

export const generateMetadata = createGenerateMetadata({
  pathname: "/",
  titleId: "seo.home.title",
  descriptionId: "seo.home.description",
});

export default async function LocalizedHomePage({ params }) {
  const { locale } = await params;
  const content = getHomeContent(locale);

  return (
    <HomeShell content={content} locale={locale}>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        badges={content.hero.badges}
        art={content.hero.art}
        backgroundImage={content.hero.atmosphereImage}
      />

      <SectionPanel title={content.intentionsTitle} subtitle={content.intentionsSubtitle}>
        <ul className="m-0 grid gap-2 p-0 md:grid-cols-3">
          {content.intentions.map((intention) => (
            <li
              key={intention}
              className="intention-card list-none rounded-[12px] border border-[var(--line)] px-3 py-3 text-sm leading-6 text-[var(--text-soft)]"
            >
              {intention}
            </li>
          ))}
        </ul>
      </SectionPanel>

      <SectionPanel title={content.toolsTitle} subtitle={content.toolsSubtitle}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {content.toolGroups.map((group) => (
            <ToolCard
              key={group.title}
              title={group.title}
              description={group.description}
              href={group.href}
              status={group.status}
              meta={group.meta}
              ctaLabel={content.openToolLabel}
              featureImage={group.image}
            />
          ))}
        </div>
      </SectionPanel>
    </HomeShell>
  );
}
