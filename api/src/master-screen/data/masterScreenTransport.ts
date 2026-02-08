export interface MasterScreenBoat {
  name: string;
  price: string;
  rent: string;
}

export interface MasterScreenMount {
  name: string;
  price: string;
  rent: string;
  charge: string;
}

export interface MasterScreenMountEquipment {
  name: string;
  price: string;
  charge: string;
}

export const masterScreenBoats: MasterScreenBoat[] = [
  { name: "Dirigeable", price: "20 000 PO", rent: "100 PO" },
  { name: "Barque", price: "50 PO", rent: "5 PA" },
  { name: "Quillard", price: "3 000 PO", rent: "100 PO" },
  { name: "Voilier", price: "10 000 PO", rent: "150 PO" },
  { name: "Drakkar", price: "10 000 PO", rent: "150 PO" },
  { name: "Galere", price: "30 000 PO", rent: "200 PO" },
  { name: "Navire de guerre", price: "25 000 PO", rent: "200 PO" },
];

export const masterScreenMounts: MasterScreenMount[] = [
  { name: "Ane ou mule", price: "8 PO", rent: "5 PA", charge: "210 kg" },
  { name: "Chameau", price: "50 PO", rent: "3 PO", charge: "240 kg" },
  { name: "Cheval de guerre", price: "400 PO", rent: "20 PO", charge: "270 kg" },
  { name: "Cheval de selle", price: "75 PO", rent: "5 PO", charge: "240 kg" },
  { name: "Cheval de trait", price: "75 PO", rent: "5 PO", charge: "240 kg" },
  { name: "Elephant", price: "200 PO", rent: "15 PO", charge: "660 kg" },
  { name: "Molosse", price: "25 PO", rent: "1 PO", charge: "95 kg" },
  { name: "Poney", price: "30 PO", rent: "1 PO", charge: "95 kg" },
];

export const masterScreenMountEquipments: MasterScreenMountEquipment[] = [
  { name: "Bardes (armures)", price: "x4", charge: "x2" },
  { name: "Fontes", price: "4 PO", charge: "4 kg" },
  { name: "Fourrage (par jour)", price: "5 PC", charge: "5 kg" },
  { name: "Mors et brides", price: "2 PO", charge: "500g" },
  { name: "Selle d'equitation", price: "10 PO", charge: "12,5 kg" },
  { name: "Selle de bat", price: "5 PO", charge: "7,5 kg" },
  { name: "Selle exotique", price: "60 PO", charge: "20 kg" },
  { name: "Selle militaire", price: "20 PO", charge: "15 kg" },
  { name: "Carrosse", price: "100 PO", charge: "300 kg" },
  { name: "Char", price: "250 PO", charge: "50 kg" },
  { name: "Charrette", price: "35 PO", charge: "200 kg" },
  { name: "Ecurie (par jour)", price: "5 PA", charge: "-" },
  { name: "Traineau", price: "20 PO", charge: "150 kg" },
];
