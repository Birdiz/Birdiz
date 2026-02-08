export const homeContent = {
  projectName: "DDBuilder",
  subtitle: "Player and DM toolkit",
  hero: {
    eyebrow: "Session Utility Suite",
    title: "Tools first. Lore second. Faster play for everyone.",
    description:
      "DDBuilder helps players and Dungeon Masters run smoother sessions with practical references, quick lookups, and repeatable preparation workflows.",
    badges: ["D20 focused", "Table-ready", "Built for fast decisions"],
    art: "Every module is designed as a lightweight in-session utility: glance, decide, continue the story.",
  },
  intentions: [
    "Reduce rule lookup time during play.",
    "Keep shared references visible for the whole table.",
    "Support player agency with practical, readable tools.",
  ],
  toolGroups: [
    {
      title: "Master Screen",
      description: "Reference dashboards for damages, transport, properties, and lifestyles.",
      href: "/master-screen",
      status: "Live",
      meta: ["DM", "Economic tables", "Session prep"],
    },
    {
      title: "Encounter Utilities",
      description: "Initiative, pacing, and combat support modules for active scenes.",
      href: "/next-steps",
      status: "Planned",
      meta: ["DM", "Combat flow", "Roadmap"],
    },
    {
      title: "Character Aids",
      description: "Quick references for players: travel, costs, and play loop reminders.",
      href: "/next-steps",
      status: "Planned",
      meta: ["Players", "In-session", "Roadmap"],
    },
  ],
  nextSteps: {
    title: "Delivery roadmap",
    description:
      "The next iterations focus on playable utilities that improve table speed and decision clarity, starting with Master Screen extensions.",
    milestones: [
      {
        name: "Master Screen expansion",
        status: "In progress",
        detail: "Extend references with equipment, weather, and movement quick tables.",
      },
      {
        name: "Encounter helpers",
        status: "Planned",
        detail: "Add turn and pacing helpers for combat and exploration scenes.",
      },
      {
        name: "Player utility pack",
        status: "Planned",
        detail: "Provide streamlined player-facing references with printable views.",
      },
    ],
  },
  menuItems: [
    { label: "Home", href: "/" },
    { label: "Master Screen", href: "/master-screen" },
    { label: "Roadmap", href: "/next-steps" },
  ],
  githubUrl: "https://github.com/Birdiz/Birdiz",
};
