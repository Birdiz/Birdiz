export function buildNavigationContent(t, locale) {
  return {
    menuItems: [
      { label: t("nav.home"), href: `/${locale}` },
      { label: t("nav.masterScreen"), href: `/${locale}/master-screen` },
      { label: t("nav.roadmap"), href: `/${locale}/next-steps` },
    ],
    githubUrl: "https://github.com/Birdiz/Birdiz",
  };
}
