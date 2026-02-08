export interface MasterScreenDamage {
  die: string;
  examplesFr: string[];
  examplesEn: string[];
}

export const masterScreenDamages: MasterScreenDamage[] = [
  {
    die: "1d10",
    examplesFr: [
      "Br\u00fbler par quelque chose",
      "\u00c9craser par une armoire",
      "Piquer par une aiguille empoisonn\u00e9e",
      "Tomber de ~4m",
      "Prendre un coup de pelle",
      "Se faire assommer",
      "Prendre un c\u00f4ne de vapeur",
    ],
    examplesEn: [
      "Burned by something",
      "Crushed by a wardrobe",
      "Pierced by a poisoned needle",
      "Falling about 4m",
      "Hit by a shovel",
      "Knocked unconscious",
      "Hit by a steam cone",
    ],
  },
  {
    die: "2d10",
    examplesFr: [
      "Frapper par la foudre",
      "Tr\u00e9bucher dans un feu de camp",
      "\u00c9craser par une statue",
      "\u00c9craser par un cheval",
    ],
    examplesEn: [
      "Struck by lightning",
      "Stumble into a campfire",
      "Crushed by a statue",
      "Crushed by a horse",
    ],
  },
  {
    die: "4d10",
    examplesFr: [
      "Se faire prendre dans un \u00e9boulement",
      "Tomber dans une cuve d'acide",
      "Prendre un pieu de barricadement",
      "\u00c9craser par une charrette",
    ],
    examplesEn: [
      "Caught in a cave-in",
      "Falling into a vat of acid",
      "Impaled by a barricade stake",
      "Crushed by a cart",
    ],
  },
  {
    die: "10d10",
    examplesFr: [
      "\u00c9craser par des murs se compactant",
      "Toucher par une roue de lames en fer",
      "Traverser un champ de lave",
    ],
    examplesEn: [
      "Crushed by compacting walls",
      "Hit by an iron blade wheel",
      "Crossing a lava field",
    ],
  },
  {
    die: "18d10",
    examplesFr: ["Tomber dans la lave", "\u00c9craser par une forteresse volante"],
    examplesEn: ["Falling into lava", "Crushed by a flying fortress"],
  },
  {
    die: "24d10",
    examplesFr: [
      "Se faire prendre dans un tourbillon de feu dans le plan du Chaos \u00c9l\u00e9mentaire de Feu",
      "Se faire broyer par les m\u00e2choires d'une cr\u00e9ature divine ou d'un monstre de la taille d'une lune",
    ],
    examplesEn: [
      "Caught in a fire vortex on the Elemental Plane of Fire",
      "Crushed in the jaws of a divine creature or moon-sized monster",
    ],
  },
];
