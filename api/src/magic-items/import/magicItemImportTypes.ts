import type { MagicItemDocument, RawListingItem } from "../types/magicItemTypes";

export interface MagicItemImportRunDocument {
  runId: string;
  startedAt: string;
  finishedAt: string | null;
  status: "running" | "success" | "failed";
  source: "aidedd";
  listingUrlEn: string;
  listingUrlFr: string;
  counters: {
    fetchedEn: number;
    fetchedFr: number;
    merged: number;
    inserted: number;
    updated: number;
    unchanged: number;
    deactivated: number;
    errors: number;
  };
  warnings: string[];
  errors: string[];
}

export interface MergeResult {
  item: Omit<MagicItemDocument, "sortOrder">;
  confidence: "high" | "medium" | "low";
  warning: string | null;
}

export interface MagicItemMergeOutput {
  mergedItems: Omit<MagicItemDocument, "sortOrder">[];
  warnings: string[];
  unmatchedEn: RawListingItem[];
  unmatchedFr: RawListingItem[];
}
