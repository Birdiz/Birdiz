export interface MasterScreenBuilding {
  name: string;
  nameEn?: string;
  nameFr?: string;
  price: string;
  rent: string;
  duration: string;
}

export interface MasterScreenMaintenance {
  name: string;
  nameEn?: string;
  nameFr?: string;
  cost: string;
  workerUnqualified: string;
  workerQualified: string;
}

export const masterScreenBuildings: MasterScreenBuilding[] = [
  { name: "Champ", nameFr: "Champ", nameEn: "Field", price: "100 PO", rent: "5 PO", duration: "-" },
  { name: "Cottage", nameFr: "Cottage", nameEn: "Cottage", price: "400 PO", rent: "5 PO", duration: "15" },
  { name: "Statue", nameFr: "Statue", nameEn: "Statue", price: "500 PO", rent: "-", duration: "15" },
  { name: "Atelier", nameFr: "Atelier", nameEn: "Workshop", price: "500 PO", rent: "20 PO", duration: "30" },
  { name: "Quartiers", nameFr: "Quartiers", nameEn: "Barracks", price: "1 000 PO", rent: "20 PO", duration: "25" },
  { name: "Fumoir", nameFr: "Fumoir", nameEn: "Smokehouse", price: "1 000 PO", rent: "15 PO", duration: "100" },
  { name: "Grange en bois", nameFr: "Grange en bois", nameEn: "Wooden barn", price: "1 500 PO", rent: "5 PO", duration: "20" },
  { name: "Etable", nameFr: "Etable", nameEn: "Stable", price: "2 000 PO", rent: "10 PO", duration: "20" },
  { name: "Moulin", nameFr: "Moulin", nameEn: "Mill", price: "2 000 PO", rent: "25 PO", duration: "180" },
  { name: "Hall de guilde", nameFr: "Hall de guilde", nameEn: "Guildhall", price: "5 000 PO", rent: "30 PO", duration: "60" },
  { name: "Comptoir de commerce", nameFr: "Comptoir de commerce", nameEn: "Trading post", price: "5 000 PO", rent: "100 PO", duration: "60" },
  { name: "Brasserie", nameFr: "Brasserie", nameEn: "Brewery", price: "6 000 PO", rent: "50 PO", duration: "40" },
  { name: "Tour", nameFr: "Tour", nameEn: "Tower", price: "6 000 PO", rent: "15 PO", duration: "40" },
  { name: "Ecole", nameFr: "Ecole", nameEn: "School", price: "8 000 PO", rent: "100 PO", duration: "150" },
  { name: "Theatre", nameFr: "Theatre", nameEn: "Theater", price: "10 000 PO", rent: "250 PO", duration: "250" },
  { name: "Bibliotheque", nameFr: "Bibliotheque", nameEn: "Library", price: "10 000 PO", rent: "200 PO", duration: "200" },
  { name: "Avant-poste ou fort", nameFr: "Avant-poste ou fort", nameEn: "Outpost or fort", price: "15 000 PO", rent: "100 PO", duration: "100" },
  { name: "Tour fortifiee", nameFr: "Tour fortifiee", nameEn: "Fortified tower", price: "15 000 PO", rent: "100 PO", duration: "100" },
  { name: "Atelier d'enchanteur", nameFr: "Atelier d'enchanteur", nameEn: "Enchanter's workshop", price: "15 000 PO", rent: "150 PO", duration: "80" },
  { name: "Domaine noble avec manoir", nameFr: "Domaine noble avec manoir", nameEn: "Noble estate with manor", price: "25 000 PO", rent: "500 PO", duration: "150" },
  { name: "Laboratoire d'alchimie", nameFr: "Laboratoire d'alchimie", nameEn: "Alchemy laboratory", price: "25 000 PO", rent: "500 PO", duration: "200" },
  { name: "Musee", nameFr: "Musee", nameEn: "Museum", price: "25 000 PO", rent: "300 PO", duration: "200" },
  { name: "Abbaye", nameFr: "Abbaye", nameEn: "Abbey", price: "50 000 PO", rent: "1 000 PO", duration: "400" },
  { name: "Donjon ou petit chateau", nameFr: "Donjon ou petit chateau", nameEn: "Keep or small castle", price: "50 000 PO", rent: "1 500 PO", duration: "400" },
  { name: "Temple", nameFr: "Temple", nameEn: "Temple", price: "50 000 PO", rent: "1 250 PO", duration: "400" },
  { name: "Palais ou grand chateau", nameFr: "Palais ou grand chateau", nameEn: "Palace or large castle", price: "500 000 PO", rent: "5 000 PO", duration: "1 200" },
];

export const masterScreenMaintenances: MasterScreenMaintenance[] = [
  { name: "Cabane de chasse", nameFr: "Cabane de chasse", nameEn: "Hunting lodge", cost: "5 PA", workerUnqualified: "-", workerQualified: "1" },
  { name: "Ferme", nameFr: "Ferme", nameEn: "Farm", cost: "5 PA", workerUnqualified: "2", workerQualified: "1" },
  { name: "Petit temple", nameFr: "Petit temple", nameEn: "Small temple", cost: "1 PO", workerUnqualified: "-", workerQualified: "2" },
  { name: "Boutique", nameFr: "Boutique", nameEn: "Shop", cost: "2 PO", workerUnqualified: "-", workerQualified: "1" },
  { name: "Auberge (ville)", nameFr: "Auberge (ville)", nameEn: "Inn (town)", cost: "5 PO", workerUnqualified: "1", workerQualified: "5" },
  { name: "Hall de guilde", nameFr: "Hall de guilde", nameEn: "Guildhall", cost: "5 PO", workerUnqualified: "3", workerQualified: "5" },
  { name: "Auberge (campagne)", nameFr: "Auberge (campagne)", nameEn: "Inn (countryside)", cost: "10 PO", workerUnqualified: "5", workerQualified: "10" },
  { name: "Comptoir de commerce", nameFr: "Comptoir de commerce", nameEn: "Trading post", cost: "10 PO", workerUnqualified: "2", workerQualified: "4" },
  { name: "Domaine noble", nameFr: "Domaine noble", nameEn: "Noble estate", cost: "10 PO", workerUnqualified: "15", workerQualified: "3" },
  { name: "Abbaye", nameFr: "Abbaye", nameEn: "Abbey", cost: "20 PO", workerUnqualified: "25", workerQualified: "5" },
  { name: "Grand temple", nameFr: "Grand temple", nameEn: "Great temple", cost: "25 PO", workerUnqualified: "10", workerQualified: "10" },
  { name: "Tour fortifiee", nameFr: "Tour fortifiee", nameEn: "Fortified tower", cost: "25 PO", workerUnqualified: "-", workerQualified: "10" },
  { name: "Avant-poste ou fort", nameFr: "Avant-poste ou fort", nameEn: "Outpost or fort", cost: "50 PO", workerUnqualified: "40", workerQualified: "20" },
  { name: "Donjon ou petit chateau", nameFr: "Donjon ou petit chateau", nameEn: "Keep or small castle", cost: "100 PO", workerUnqualified: "50", workerQualified: "50" },
  { name: "Palais ou grand chateau", nameFr: "Palais ou grand chateau", nameEn: "Palace or large castle", cost: "400 PO", workerUnqualified: "100", workerQualified: "200" },
];
