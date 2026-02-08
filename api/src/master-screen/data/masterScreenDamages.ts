export interface MasterScreenDamage {
  die: string;
  examples: string[];
}

export const masterScreenDamages: MasterScreenDamage[] = [
  {
    die: "1d10",
    examples: [
      "Br\u00fbler par quelque chose",
      "\u00c9craser par une armoire",
      "Piquer par une aiguille empoisonn\u00e9e",
      "Tomber de ~4m",
      "Prendre un coup de pelle",
      "Se faire assommer",
      "Prendre un c\u00f4ne de vapeur",
    ],
  },
  {
    die: "2d10",
    examples: [
      "Frapper par la foudre",
      "Tr\u00e9bucher dans un feu de camp",
      "\u00c9craser par une statue",
      "\u00c9craser par un cheval",
    ],
  },
  {
    die: "4d10",
    examples: [
      "Se faire prendre dans un \u00e9boulement",
      "Tomber dans une cuve d'acide",
      "Prendre un pieu de barricadement",
      "\u00c9craser par une charrette",
    ],
  },
  {
    die: "10d10",
    examples: [
      "\u00c9craser par des murs se compactant",
      "Toucher par une roue de lames en fer",
      "Traverser un champ de lave",
    ],
  },
  {
    die: "18d10",
    examples: ["Tomber dans la lave", "\u00c9craser par une forteresse volante"],
  },
  {
    die: "24d10",
    examples: [
      "Se faire prendre dans un tourbillon de feu dans le plan du Chaos \u00c9l\u00e9mentaire de Feu",
      "Se faire broyer par les m\u00e2choires d'une cr\u00e9ature divine ou d'un monstre de la taille d'une lune",
    ],
  },
];
