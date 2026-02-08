export interface MasterScreenLifestyleService {
  name: string;
  price: string;
}

export interface MasterScreenLifestyle {
  name: string;
  price: string;
  description: string;
  services: MasterScreenLifestyleService[];
}

const richLifestyleServices: MasterScreenLifestyleService[] = [
  { name: "Embaucher un travailleur non qualifie", price: "2 PA/j" },
  { name: "Embaucher un travailleur qualifie", price: "2 PO/j" },
  { name: "Embaucher un messager", price: "2 PC/km" },
  { name: "Transport en ville", price: "1 PC/j" },
  { name: "Transport entre deux villes", price: "2 PC/1,5km" },
  { name: "Transport en bateau", price: "1 PA/1,5km" },
  { name: "Garde personnel", price: "5 PA/j" },
  { name: "Prostitue(e)", price: "1 PO/j minimum" },
  { name: "Groupe de chasse", price: "1 PO/j/pnj" },
  { name: "Groupe de cueilleur", price: "5 PA/j/pnj" },
];

export const masterScreenLifestyles: MasterScreenLifestyle[] = [
  {
    name: "Miserable",
    price: "-",
    description:
      "Vous vivez dans des conditions inhumaines, sans vrai chez-vous, et restez expose aux dangers, a la violence, a la maladie et a la faim.",
    services: [],
  },
  {
    name: "Sordide",
    price: "1PA/j",
    description:
      "Vous vivez dans des abris precaires et des quartiers difficiles. Vous avez peu de protections legales et subissez un quotidien instable.",
    services: [],
  },
  {
    name: "Pauvre",
    price: "2PA/j",
    description:
      "Vous avez un toit et de quoi manger, mais peu de confort. Les conditions restent dures et l'environnement souvent dangereux.",
    services: [],
  },
  {
    name: "Modeste",
    price: "1PO/j",
    description:
      "Vous vivez simplement mais proprement, avec un equipement entretenu et un quotidien relativement stable.",
    services: [
      { name: "Embaucher un messager", price: "2 PC/km" },
      { name: "Transport en ville", price: "1 PC/j" },
    ],
  },
  {
    name: "Confortable",
    price: "2PO/j",
    description:
      "Vous pouvez vous offrir de meilleurs vetements, entretenir votre materiel et vivre dans de bonnes conditions.",
    services: [
      { name: "Embaucher un travailleur non qualifie", price: "2 PA/j" },
      { name: "Embaucher un messager", price: "2 PC/km" },
      { name: "Transport en ville", price: "1 PC/j" },
      { name: "Transport entre deux villes", price: "2 PC/1,5km" },
      { name: "Garde personnel", price: "5 PA/j" },
    ],
  },
  {
    name: "Riche",
    price: "4PO/j",
    description:
      "Vous vivez dans le luxe, avec logement de qualite et personnel. Vous evoluez parmi les marchands prosperes et elites locales.",
    services: richLifestyleServices,
  },
  {
    name: "Aristocratique",
    price: "10PO/j minimum",
    description:
      "Vous vivez dans l'abondance, frequentez les cercles de pouvoir et participez a des dynamiques politiques complexes.",
    services: richLifestyleServices,
  },
];
