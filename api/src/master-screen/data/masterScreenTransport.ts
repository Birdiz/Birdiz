export interface MasterScreenBoat {
  name: string;
  nameEn?: string;
  nameFr?: string;
  price: string;
  rent: string;
}

export interface MasterScreenMount {
  name: string;
  nameEn?: string;
  nameFr?: string;
  price: string;
  rent: string;
  charge: string;
}

export interface MasterScreenMountEquipment {
  name: string;
  nameEn?: string;
  nameFr?: string;
  price: string;
  charge: string;
}

export const masterScreenBoats: MasterScreenBoat[] = [
  { name: "Dirigeable", nameFr: "Dirigeable", nameEn: "Airship", price: "20 000 PO", rent: "100 PO" },
  { name: "Barque", nameFr: "Barque", nameEn: "Rowboat", price: "50 PO", rent: "5 PA" },
  { name: "Quillard", nameFr: "Quillard", nameEn: "Keelboat", price: "3 000 PO", rent: "100 PO" },
  { name: "Voilier", nameFr: "Voilier", nameEn: "Sailing ship", price: "10 000 PO", rent: "150 PO" },
  { name: "Drakkar", nameFr: "Drakkar", nameEn: "Longship", price: "10 000 PO", rent: "150 PO" },
  { name: "Galere", nameFr: "Galere", nameEn: "Galley", price: "30 000 PO", rent: "200 PO" },
  { name: "Navire de guerre", nameFr: "Navire de guerre", nameEn: "Warship", price: "25 000 PO", rent: "200 PO" },
];

export const masterScreenMounts: MasterScreenMount[] = [
  { name: "Ane ou mule", nameFr: "Ane ou mule", nameEn: "Donkey or mule", price: "8 PO", rent: "5 PA", charge: "210 kg" },
  { name: "Chameau", nameFr: "Chameau", nameEn: "Camel", price: "50 PO", rent: "3 PO", charge: "240 kg" },
  { name: "Cheval de guerre", nameFr: "Cheval de guerre", nameEn: "Warhorse", price: "400 PO", rent: "20 PO", charge: "270 kg" },
  { name: "Cheval de selle", nameFr: "Cheval de selle", nameEn: "Riding horse", price: "75 PO", rent: "5 PO", charge: "240 kg" },
  { name: "Cheval de trait", nameFr: "Cheval de trait", nameEn: "Draft horse", price: "75 PO", rent: "5 PO", charge: "240 kg" },
  { name: "Elephant", nameFr: "Elephant", nameEn: "Elephant", price: "200 PO", rent: "15 PO", charge: "660 kg" },
  { name: "Molosse", nameFr: "Molosse", nameEn: "Mastiff", price: "25 PO", rent: "1 PO", charge: "95 kg" },
  { name: "Poney", nameFr: "Poney", nameEn: "Pony", price: "30 PO", rent: "1 PO", charge: "95 kg" },
];

export const masterScreenMountEquipments: MasterScreenMountEquipment[] = [
  { name: "Bardes (armures)", nameFr: "Bardes (armures)", nameEn: "Barding (armor)", price: "x4", charge: "x2" },
  { name: "Fontes", nameFr: "Fontes", nameEn: "Saddlebags", price: "4 PO", charge: "4 kg" },
  { name: "Fourrage (par jour)", nameFr: "Fourrage (par jour)", nameEn: "Feed (per day)", price: "5 PC", charge: "5 kg" },
  { name: "Mors et brides", nameFr: "Mors et brides", nameEn: "Bit and bridle", price: "2 PO", charge: "500g" },
  { name: "Selle d'equitation", nameFr: "Selle d'equitation", nameEn: "Riding saddle", price: "10 PO", charge: "12,5 kg" },
  { name: "Selle de bat", nameFr: "Selle de bat", nameEn: "Pack saddle", price: "5 PO", charge: "7,5 kg" },
  { name: "Selle exotique", nameFr: "Selle exotique", nameEn: "Exotic saddle", price: "60 PO", charge: "20 kg" },
  { name: "Selle militaire", nameFr: "Selle militaire", nameEn: "Military saddle", price: "20 PO", charge: "15 kg" },
  { name: "Carrosse", nameFr: "Carrosse", nameEn: "Carriage", price: "100 PO", charge: "300 kg" },
  { name: "Char", nameFr: "Char", nameEn: "Chariot", price: "250 PO", charge: "50 kg" },
  { name: "Charrette", nameFr: "Charrette", nameEn: "Cart", price: "35 PO", charge: "200 kg" },
  { name: "Ecurie (par jour)", nameFr: "Ecurie (par jour)", nameEn: "Stabling (per day)", price: "5 PA", charge: "-" },
  { name: "Traineau", nameFr: "Traineau", nameEn: "Sled", price: "20 PO", charge: "150 kg" },
];
