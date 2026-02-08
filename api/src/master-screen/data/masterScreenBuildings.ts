export interface MasterScreenBuilding {
  name: string;
  price: string;
  rent: string;
  duration: string;
}

export interface MasterScreenMaintenance {
  name: string;
  cost: string;
  workerUnqualified: string;
  workerQualified: string;
}

export const masterScreenBuildings: MasterScreenBuilding[] = [
  { name: "Champ", price: "100 PO", rent: "5 PO", duration: "-" },
  { name: "Cottage", price: "400 PO", rent: "5 PO", duration: "15" },
  { name: "Statue", price: "500 PO", rent: "-", duration: "15" },
  { name: "Atelier", price: "500 PO", rent: "20 PO", duration: "30" },
  { name: "Quartiers", price: "1 000 PO", rent: "20 PO", duration: "25" },
  { name: "Fumoir", price: "1 000 PO", rent: "15 PO", duration: "100" },
  { name: "Grange en bois", price: "1 500 PO", rent: "5 PO", duration: "20" },
  { name: "Etable", price: "2 000 PO", rent: "10 PO", duration: "20" },
  { name: "Moulin", price: "2 000 PO", rent: "25 PO", duration: "180" },
  { name: "Hall de guilde", price: "5 000 PO", rent: "30 PO", duration: "60" },
  { name: "Comptoir de commerce", price: "5 000 PO", rent: "100 PO", duration: "60" },
  { name: "Brasserie", price: "6 000 PO", rent: "50 PO", duration: "40" },
  { name: "Tour", price: "6 000 PO", rent: "15 PO", duration: "40" },
  { name: "Ecole", price: "8 000 PO", rent: "100 PO", duration: "150" },
  { name: "Theatre", price: "10 000 PO", rent: "250 PO", duration: "250" },
  { name: "Bibliotheque", price: "10 000 PO", rent: "200 PO", duration: "200" },
  { name: "Avant-poste ou fort", price: "15 000 PO", rent: "100 PO", duration: "100" },
  { name: "Tour fortifiee", price: "15 000 PO", rent: "100 PO", duration: "100" },
  { name: "Atelier d'enchanteur", price: "15 000 PO", rent: "150 PO", duration: "80" },
  { name: "Domaine noble avec manoir", price: "25 000 PO", rent: "500 PO", duration: "150" },
  { name: "Laboratoire d'alchimie", price: "25 000 PO", rent: "500 PO", duration: "200" },
  { name: "Musee", price: "25 000 PO", rent: "300 PO", duration: "200" },
  { name: "Abbaye", price: "50 000 PO", rent: "1 000 PO", duration: "400" },
  { name: "Donjon ou petit chateau", price: "50 000 PO", rent: "1 500 PO", duration: "400" },
  { name: "Temple", price: "50 000 PO", rent: "1 250 PO", duration: "400" },
  { name: "Palais ou grand chateau", price: "500 000 PO", rent: "5 000 PO", duration: "1 200" },
];

export const masterScreenMaintenances: MasterScreenMaintenance[] = [
  { name: "Cabane de chasse", cost: "5 PA", workerUnqualified: "-", workerQualified: "1" },
  { name: "Ferme", cost: "5 PA", workerUnqualified: "2", workerQualified: "1" },
  { name: "Petit temple", cost: "1 PO", workerUnqualified: "-", workerQualified: "2" },
  { name: "Boutique", cost: "2 PO", workerUnqualified: "-", workerQualified: "1" },
  { name: "Auberge (ville)", cost: "5 PO", workerUnqualified: "1", workerQualified: "5" },
  { name: "Hall de guilde", cost: "5 PO", workerUnqualified: "3", workerQualified: "5" },
  { name: "Auberge (campagne)", cost: "10 PO", workerUnqualified: "5", workerQualified: "10" },
  { name: "Comptoir de commerce", cost: "10 PO", workerUnqualified: "2", workerQualified: "4" },
  { name: "Domaine noble", cost: "10 PO", workerUnqualified: "15", workerQualified: "3" },
  { name: "Abbaye", cost: "20 PO", workerUnqualified: "25", workerQualified: "5" },
  { name: "Grand temple", cost: "25 PO", workerUnqualified: "10", workerQualified: "10" },
  { name: "Tour fortifiee", cost: "25 PO", workerUnqualified: "-", workerQualified: "10" },
  { name: "Avant-poste ou fort", cost: "50 PO", workerUnqualified: "40", workerQualified: "20" },
  { name: "Donjon ou petit chateau", cost: "100 PO", workerUnqualified: "50", workerQualified: "50" },
  { name: "Palais ou grand chateau", cost: "400 PO", workerUnqualified: "100", workerQualified: "200" },
];
