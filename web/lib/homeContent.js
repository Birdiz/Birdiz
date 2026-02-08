import { getIntl } from "./i18n/intl";
import {
  buildHomeSection,
  buildToolGroups,
} from "./home-content/home-section";
import { buildNavigationContent } from "./home-content/navigation-section";
import { buildRoadmapSection } from "./home-content/roadmap-section";

export function getHomeContent(locale) {
  const intl = getIntl(locale);
  const t = (id, values) => intl.formatMessage({ id }, values);

  const homeSection = buildHomeSection(t);
  const roadmapSection = buildRoadmapSection(t);
  const navigation = buildNavigationContent(t, locale);

  return {
    locale,
    projectName: t("app.projectName"),
    subtitle: t("app.subtitle"),
    hero: homeSection.hero,
    intentionsTitle: homeSection.intentionsTitle,
    intentionsSubtitle: homeSection.intentionsSubtitle,
    intentions: homeSection.intentions,
    toolsTitle: homeSection.toolsTitle,
    toolsSubtitle: homeSection.toolsSubtitle,
    openToolLabel: homeSection.openToolLabel,
    toolGroups: buildToolGroups(t, locale),
    nextSteps: roadmapSection,
    menuItems: navigation.menuItems,
    githubUrl: navigation.githubUrl,
  };
}
