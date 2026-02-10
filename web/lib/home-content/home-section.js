export function buildHomeSection(t) {
  return {
    hero: {
      eyebrow: t("home.hero.eyebrow"),
      title: t("home.hero.title"),
      description: t("home.hero.description"),
      badges: [t("home.hero.badge1"), t("home.hero.badge2"), t("home.hero.badge3")],
      art: t("home.hero.art"),
      atmosphereImage: "/ambiance/hero-atmosphere.svg",
    },
    toolsTitle: t("home.tools.title"),
    toolsSubtitle: t("home.tools.subtitle"),
    openToolLabel: t("home.tools.open"),
  };
}

export function buildToolGroups(t, locale) {
  return [
    {
      title: t("home.tool.master.title"),
      description: t("home.tool.master.description"),
      href: `/${locale}/master-screen`,
      status: t("home.tool.master.status"),
      meta: [
        t("home.tool.master.meta1"),
        t("home.tool.master.meta2"),
        t("home.tool.master.meta3"),
      ],
      image: "/features/master-screen.svg",
    },
    {
      title: t("home.tool.encounter.title"),
      description: t("home.tool.encounter.description"),
      href: `/${locale}/next-steps`,
      status: t("home.tool.encounter.status"),
      meta: [
        t("home.tool.encounter.meta1"),
        t("home.tool.encounter.meta2"),
        t("home.tool.encounter.meta3"),
      ],
      image: "/features/encounter-utilities.svg",
    },
    {
      title: t("home.tool.player.title"),
      description: t("home.tool.player.description"),
      href: `/${locale}/next-steps`,
      status: t("home.tool.player.status"),
      meta: [
        t("home.tool.player.meta1"),
        t("home.tool.player.meta2"),
        t("home.tool.player.meta3"),
      ],
      image: "/features/character-aids.svg",
    },
  ];
}
