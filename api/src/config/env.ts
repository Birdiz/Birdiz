export interface EnvConfig {
  port: number;
  mongoUrl: string;
  corsOrigin: string;
  magicItemsImportEnabled: boolean;
  magicItemsImportTimeoutMs: number;
  magicItemsImportUserAgent: string;
  magicItemsListingEnUrl: string;
  magicItemsListingFrUrl: string;
}

export const env: EnvConfig = {
  port: Number(process.env.PORT || 4000),
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/birdiz",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  magicItemsImportEnabled: process.env.MAGIC_ITEMS_IMPORT_ENABLED === "true",
  magicItemsImportTimeoutMs: Number(process.env.MAGIC_ITEMS_IMPORT_TIMEOUT_MS || 15000),
  magicItemsImportUserAgent:
    process.env.MAGIC_ITEMS_IMPORT_USER_AGENT || "BirdizBot/1.0 (+https://birdiz.dev)",
  magicItemsListingEnUrl:
    process.env.MAGIC_ITEMS_LISTING_EN_URL ||
    "https://www.aidedd.org/dnd-filters/magic-items.php",
  magicItemsListingFrUrl:
    process.env.MAGIC_ITEMS_LISTING_FR_URL ||
    "https://www.aidedd.org/dnd-filters/objets-magiques.php",
};
