export interface MasterScreenLifestyleService {
  name: string;
  nameEn?: string;
  nameFr?: string;
  price: string;
}

export interface MasterScreenLifestyle {
  name: string;
  nameEn?: string;
  nameFr?: string;
  price: string;
  description: string;
  descriptionEn?: string;
  descriptionFr?: string;
  services: MasterScreenLifestyleService[];
}

const richLifestyleServices: MasterScreenLifestyleService[] = [
  {
    name: "Embaucher un travailleur non qualifie",
    nameFr: "Embaucher un travailleur non qualifie",
    nameEn: "Hire an unskilled worker",
    price: "2 PA/j",
  },
  {
    name: "Embaucher un travailleur qualifie",
    nameFr: "Embaucher un travailleur qualifie",
    nameEn: "Hire a skilled worker",
    price: "2 PO/j",
  },
  {
    name: "Embaucher un messager",
    nameFr: "Embaucher un messager",
    nameEn: "Hire a messenger",
    price: "2 PC/km",
  },
  {
    name: "Transport en ville",
    nameFr: "Transport en ville",
    nameEn: "Transport within a city",
    price: "1 PC/j",
  },
  {
    name: "Transport entre deux villes",
    nameFr: "Transport entre deux villes",
    nameEn: "Transport between cities",
    price: "2 PC/1,5km",
  },
  {
    name: "Transport en bateau",
    nameFr: "Transport en bateau",
    nameEn: "Transport by boat",
    price: "1 PA/1,5km",
  },
  {
    name: "Garde personnel",
    nameFr: "Garde personnel",
    nameEn: "Personal guard",
    price: "5 PA/j",
  },
  {
    name: "Prostitue(e)",
    nameFr: "Prostitue(e)",
    nameEn: "Companion service",
    price: "1 PO/j minimum",
  },
  {
    name: "Groupe de chasse",
    nameFr: "Groupe de chasse",
    nameEn: "Hunting party",
    price: "1 PO/j/pnj",
  },
  {
    name: "Groupe de cueilleur",
    nameFr: "Groupe de cueilleur",
    nameEn: "Foraging party",
    price: "5 PA/j/pnj",
  },
];

export const masterScreenLifestyles: MasterScreenLifestyle[] = [
  {
    name: "Miserable",
    nameFr: "Miserable",
    nameEn: "Wretched",
    price: "-",
    description:
      "Vous vivez dans des conditions inhumaines, sans vrai chez-vous, et restez expose aux dangers, a la violence, a la maladie et a la faim.",
    descriptionFr:
      "Vous vivez dans des conditions inhumaines, sans vrai chez-vous, et restez expose aux dangers, a la violence, a la maladie et a la faim.",
    descriptionEn:
      "You live in inhumane conditions without a true home, constantly exposed to danger, violence, disease, and hunger.",
    services: [],
  },
  {
    name: "Sordide",
    nameFr: "Sordide",
    nameEn: "Squalid",
    price: "1PA/j",
    description:
      "Vous vivez dans des abris precaires et des quartiers difficiles. Vous avez peu de protections legales et subissez un quotidien instable.",
    descriptionFr:
      "Vous vivez dans des abris precaires et des quartiers difficiles. Vous avez peu de protections legales et subissez un quotidien instable.",
    descriptionEn:
      "You live in flimsy shelters and rough neighborhoods, with little legal protection and unstable daily conditions.",
    services: [],
  },
  {
    name: "Pauvre",
    nameFr: "Pauvre",
    nameEn: "Poor",
    price: "2PA/j",
    description:
      "Vous avez un toit et de quoi manger, mais peu de confort. Les conditions restent dures et l'environnement souvent dangereux.",
    descriptionFr:
      "Vous avez un toit et de quoi manger, mais peu de confort. Les conditions restent dures et l'environnement souvent dangereux.",
    descriptionEn:
      "You have shelter and enough to eat, but little comfort. Conditions remain harsh and the environment is often dangerous.",
    services: [],
  },
  {
    name: "Modeste",
    nameFr: "Modeste",
    nameEn: "Modest",
    price: "1PO/j",
    description:
      "Vous vivez simplement mais proprement, avec un equipement entretenu et un quotidien relativement stable.",
    descriptionFr:
      "Vous vivez simplement mais proprement, avec un equipement entretenu et un quotidien relativement stable.",
    descriptionEn:
      "You live simply but cleanly, with maintained gear and a relatively stable daily life.",
    services: [
      {
        name: "Embaucher un messager",
        nameFr: "Embaucher un messager",
        nameEn: "Hire a messenger",
        price: "2 PC/km",
      },
      {
        name: "Transport en ville",
        nameFr: "Transport en ville",
        nameEn: "Transport within a city",
        price: "1 PC/j",
      },
    ],
  },
  {
    name: "Confortable",
    nameFr: "Confortable",
    nameEn: "Comfortable",
    price: "2PO/j",
    description:
      "Vous pouvez vous offrir de meilleurs vetements, entretenir votre materiel et vivre dans de bonnes conditions.",
    descriptionFr:
      "Vous pouvez vous offrir de meilleurs vetements, entretenir votre materiel et vivre dans de bonnes conditions.",
    descriptionEn:
      "You can afford better clothing, maintain your equipment, and live in good conditions.",
    services: [
      {
        name: "Embaucher un travailleur non qualifie",
        nameFr: "Embaucher un travailleur non qualifie",
        nameEn: "Hire an unskilled worker",
        price: "2 PA/j",
      },
      {
        name: "Embaucher un messager",
        nameFr: "Embaucher un messager",
        nameEn: "Hire a messenger",
        price: "2 PC/km",
      },
      {
        name: "Transport en ville",
        nameFr: "Transport en ville",
        nameEn: "Transport within a city",
        price: "1 PC/j",
      },
      {
        name: "Transport entre deux villes",
        nameFr: "Transport entre deux villes",
        nameEn: "Transport between cities",
        price: "2 PC/1,5km",
      },
      {
        name: "Garde personnel",
        nameFr: "Garde personnel",
        nameEn: "Personal guard",
        price: "5 PA/j",
      },
    ],
  },
  {
    name: "Riche",
    nameFr: "Riche",
    nameEn: "Wealthy",
    price: "4PO/j",
    description:
      "Vous vivez dans le luxe, avec logement de qualite et personnel. Vous evoluez parmi les marchands prosperes et elites locales.",
    descriptionFr:
      "Vous vivez dans le luxe, avec logement de qualite et personnel. Vous evoluez parmi les marchands prosperes et elites locales.",
    descriptionEn:
      "You live in luxury with quality housing and staff, moving among prosperous merchants and local elites.",
    services: richLifestyleServices,
  },
  {
    name: "Aristocratique",
    nameFr: "Aristocratique",
    nameEn: "Aristocratic",
    price: "10PO/j minimum",
    description:
      "Vous vivez dans l'abondance, frequentez les cercles de pouvoir et participez a des dynamiques politiques complexes.",
    descriptionFr:
      "Vous vivez dans l'abondance, frequentez les cercles de pouvoir et participez a des dynamiques politiques complexes.",
    descriptionEn:
      "You live in abundance, frequent circles of power, and take part in complex political dynamics.",
    services: richLifestyleServices,
  },
];
