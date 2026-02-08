import { getIntl } from "./i18n/intl";

export function getHomeContent(locale) {
  const intl = getIntl(locale);

  return {
    locale,
    projectName: intl.formatMessage({ id: "app.projectName" }),
    subtitle: intl.formatMessage({ id: "app.subtitle" }),
    hero: {
      eyebrow: intl.formatMessage({ id: "home.hero.eyebrow" }),
      title: intl.formatMessage({ id: "home.hero.title" }),
      description: intl.formatMessage({ id: "home.hero.description" }),
      badges: [
        intl.formatMessage({ id: "home.hero.badge1" }),
        intl.formatMessage({ id: "home.hero.badge2" }),
        intl.formatMessage({ id: "home.hero.badge3" }),
      ],
      art: intl.formatMessage({ id: "home.hero.art" }),
    },
    intentionsTitle: intl.formatMessage({ id: "home.intentions.title" }),
    intentionsSubtitle: intl.formatMessage({ id: "home.intentions.subtitle" }),
    intentions: [
      intl.formatMessage({ id: "home.intentions.1" }),
      intl.formatMessage({ id: "home.intentions.2" }),
      intl.formatMessage({ id: "home.intentions.3" }),
    ],
    toolsTitle: intl.formatMessage({ id: "home.tools.title" }),
    toolsSubtitle: intl.formatMessage({ id: "home.tools.subtitle" }),
    openToolLabel: intl.formatMessage({ id: "home.tools.open" }),
    toolGroups: [
      {
        title: intl.formatMessage({ id: "home.tool.master.title" }),
        description: intl.formatMessage({ id: "home.tool.master.description" }),
        href: `/${locale}/master-screen`,
        status: intl.formatMessage({ id: "home.tool.master.status" }),
        meta: [
          intl.formatMessage({ id: "home.tool.master.meta1" }),
          intl.formatMessage({ id: "home.tool.master.meta2" }),
          intl.formatMessage({ id: "home.tool.master.meta3" }),
        ],
      },
      {
        title: intl.formatMessage({ id: "home.tool.encounter.title" }),
        description: intl.formatMessage({ id: "home.tool.encounter.description" }),
        href: `/${locale}/next-steps`,
        status: intl.formatMessage({ id: "home.tool.encounter.status" }),
        meta: [
          intl.formatMessage({ id: "home.tool.encounter.meta1" }),
          intl.formatMessage({ id: "home.tool.encounter.meta2" }),
          intl.formatMessage({ id: "home.tool.encounter.meta3" }),
        ],
      },
      {
        title: intl.formatMessage({ id: "home.tool.player.title" }),
        description: intl.formatMessage({ id: "home.tool.player.description" }),
        href: `/${locale}/next-steps`,
        status: intl.formatMessage({ id: "home.tool.player.status" }),
        meta: [
          intl.formatMessage({ id: "home.tool.player.meta1" }),
          intl.formatMessage({ id: "home.tool.player.meta2" }),
          intl.formatMessage({ id: "home.tool.player.meta3" }),
        ],
      },
    ],
    nextSteps: {
      eyebrow: intl.formatMessage({ id: "roadmap.eyebrow" }),
      title: intl.formatMessage({ id: "roadmap.title" }),
      description: intl.formatMessage({ id: "roadmap.description" }),
      badges: [
        intl.formatMessage({ id: "roadmap.badge1" }),
        intl.formatMessage({ id: "roadmap.badge2" }),
        intl.formatMessage({ id: "roadmap.badge3" }),
      ],
      art: intl.formatMessage({ id: "roadmap.art" }),
      milestonesTitle: intl.formatMessage({ id: "roadmap.milestones.title" }),
      milestonesSubtitle: intl.formatMessage({ id: "roadmap.milestones.subtitle" }),
      milestones: [
        {
          name: intl.formatMessage({ id: "roadmap.m1.name" }),
          status: intl.formatMessage({ id: "roadmap.m1.status" }),
          detail: intl.formatMessage({ id: "roadmap.m1.detail" }),
        },
        {
          name: intl.formatMessage({ id: "roadmap.m2.name" }),
          status: intl.formatMessage({ id: "roadmap.m2.status" }),
          detail: intl.formatMessage({ id: "roadmap.m2.detail" }),
        },
        {
          name: intl.formatMessage({ id: "roadmap.m3.name" }),
          status: intl.formatMessage({ id: "roadmap.m3.status" }),
          detail: intl.formatMessage({ id: "roadmap.m3.detail" }),
        },
      ],
    },
    menuItems: [
      { label: intl.formatMessage({ id: "nav.home" }), href: `/${locale}` },
      {
        label: intl.formatMessage({ id: "nav.masterScreen" }),
        href: `/${locale}/master-screen`,
      },
      {
        label: intl.formatMessage({ id: "nav.roadmap" }),
        href: `/${locale}/next-steps`,
      },
    ],
    githubUrl: "https://github.com/Birdiz/Birdiz",
  };
}
