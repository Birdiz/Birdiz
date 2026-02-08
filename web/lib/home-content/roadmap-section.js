export function buildRoadmapSection(t) {
  return {
    eyebrow: t("roadmap.eyebrow"),
    title: t("roadmap.title"),
    description: t("roadmap.description"),
    badges: [t("roadmap.badge1"), t("roadmap.badge2"), t("roadmap.badge3")],
    art: t("roadmap.art"),
    milestonesTitle: t("roadmap.milestones.title"),
    milestonesSubtitle: t("roadmap.milestones.subtitle"),
    milestones: [
      {
        name: t("roadmap.m1.name"),
        status: t("roadmap.m1.status"),
        detail: t("roadmap.m1.detail"),
      },
      {
        name: t("roadmap.m2.name"),
        status: t("roadmap.m2.status"),
        detail: t("roadmap.m2.detail"),
      },
      {
        name: t("roadmap.m3.name"),
        status: t("roadmap.m3.status"),
        detail: t("roadmap.m3.detail"),
      },
    ],
  };
}
