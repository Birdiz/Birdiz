import type { SupportedLocale } from "../../master-screen/utils/locale";
import type { SearchDocument, SearchDocumentProvider } from "../types/searchTypes";

const NAV_LABELS: Record<
  SupportedLocale,
  { home: string; masterScreen: string; roadmap: string }
> = {
  en: {
    home: "Home",
    masterScreen: "Master Screen",
    roadmap: "Roadmap",
  },
  fr: {
    home: "Accueil",
    masterScreen: "Écran MJ",
    roadmap: "Feuille de route",
  },
};

export class NavigationSearchDocumentProvider implements SearchDocumentProvider {
  async getDocuments(locale: SupportedLocale): Promise<SearchDocument[]> {
    const labels = NAV_LABELS[locale];
    const base = `/${locale}`;

    return [
      {
        id: `page-home-${locale}`,
        locale,
        module: "navigation",
        section: "home",
        entityType: "page",
        title: labels.home,
        body:
          locale === "en"
            ? "Landing page with DDBuilder intentions and tool modules"
            : "Page d'accueil avec les intentions DDBuilder et les modules d'outils",
        keywords: [
          labels.home,
          locale === "en" ? "landing page" : "page d'accueil",
          "ddbuilder",
        ],
        href: base,
        anchor: null,
        weight: 120,
        metadata: { route: "home" },
      },
      {
        id: `page-master-screen-${locale}`,
        locale,
        module: "navigation",
        section: "master-screen",
        entityType: "page",
        title: labels.masterScreen,
        body:
          locale === "en"
            ? "Master screen references for damages transport properties and lifestyles"
            : "Références écran MJ pour dégâts transport propriétés et modes de vie",
        keywords: [labels.masterScreen, "master-screen", "dm", "mj"],
        href: `${base}/master-screen`,
        anchor: null,
        weight: 130,
        metadata: { route: "master-screen" },
      },
      {
        id: `page-next-steps-${locale}`,
        locale,
        module: "navigation",
        section: "next-steps",
        entityType: "page",
        title: labels.roadmap,
        body:
          locale === "en"
            ? "Delivery roadmap and milestone planning"
            : "Feuille de route de livraison et planification des jalons",
        keywords: [labels.roadmap, "next steps", "roadmap", "milestones"],
        href: `${base}/next-steps`,
        anchor: null,
        weight: 110,
        metadata: { route: "next-steps" },
      },
    ];
  }
}
