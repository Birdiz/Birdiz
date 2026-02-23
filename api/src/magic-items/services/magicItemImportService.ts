import { randomUUID } from "node:crypto";
import { env } from "../../config/env";
import { AideddClient } from "../import/aideddClient";
import { AideddParser } from "../import/aideddParser";
import {
  loadLegacyDdbuilderFallbackItems,
  type LegacyDdbuilderItem,
} from "../import/legacyDdbuilderFallback";
import type { MagicItemImportRunDocument } from "../import/magicItemImportTypes";
import {
  computeMagicItemSourceHash,
  mergeMagicItemLocales,
} from "../import/mergeLocales";
import type { MagicItemImportRunRepository } from "../repositories/magicItemImportRunRepository";
import type { MagicItemRepository } from "../repositories/magicItemRepository";
import type { RawListingItem } from "../types/magicItemTypes";

export interface MagicItemImportSummary {
  runId: string;
  status: "success" | "failed";
  counters: MagicItemImportRunDocument["counters"];
  warnings: string[];
  errors: string[];
}

interface MagicItemImportServiceOptions {
  aideddClient: AideddClient;
  aideddParser: AideddParser;
  magicItemRepository: MagicItemRepository;
  magicItemImportRunRepository: MagicItemImportRunRepository;
  loadLegacyItems?: () => Promise<LegacyDdbuilderItem[]>;
}

export class MagicItemImportService {
  private readonly aideddClient: AideddClient;
  private readonly aideddParser: AideddParser;
  private readonly magicItemRepository: MagicItemRepository;
  private readonly magicItemImportRunRepository: MagicItemImportRunRepository;
  private readonly loadLegacyItems: () => Promise<LegacyDdbuilderItem[]>;

  constructor({
    aideddClient,
    aideddParser,
    magicItemRepository,
    magicItemImportRunRepository,
    loadLegacyItems = loadLegacyDdbuilderFallbackItems,
  }: MagicItemImportServiceOptions) {
    this.aideddClient = aideddClient;
    this.aideddParser = aideddParser;
    this.magicItemRepository = magicItemRepository;
    this.magicItemImportRunRepository = magicItemImportRunRepository;
    this.loadLegacyItems = loadLegacyItems;
  }

  async runImport(): Promise<MagicItemImportSummary> {
    const runId = randomUUID();
    const startedAt = new Date().toISOString();
    const counters: MagicItemImportRunDocument["counters"] = {
      fetchedEn: 0,
      fetchedFr: 0,
      merged: 0,
      inserted: 0,
      updated: 0,
      unchanged: 0,
      deactivated: 0,
      errors: 0,
    };
    const warnings: string[] = [];
    const errors: string[] = [];

    await this.magicItemImportRunRepository.create({
      runId,
      startedAt,
      finishedAt: null,
      status: "running",
      source: "aidedd",
      listingUrlEn: env.magicItemsListingEnUrl,
      listingUrlFr: env.magicItemsListingFrUrl,
      counters,
      warnings,
      errors,
    });

    try {
      let enItems: RawListingItem[] = [];
      let frItems: RawListingItem[] = [];

      try {
        const { enHtml, frHtml } = await this.aideddClient.fetchListings();
        enItems = this.aideddParser.parseListing(enHtml, "en");
        frItems = this.aideddParser.parseListing(frHtml, "fr");
      } catch (listingError: unknown) {
        const fallbackItems = await this.loadLegacyItems();

        if (fallbackItems.length === 0) {
          throw listingError;
        }

        warnings.push(
          `Aidedd fetch unavailable. Used local DDBuilder fallback (${fallbackItems.length} items).`,
        );
        enItems = fallbackItems.map((item) => ({
          lang: "en",
          name: item.name,
          voName: item.name,
          type: null,
          rarity: null,
          requiresAttunement: null,
          attunementText: null,
          sourceBook: "DDBuilder legacy",
          itemUrl: item.link,
        }));
        frItems = fallbackItems.map((item) => ({
          lang: "fr",
          name: item.name,
          voName: item.name,
          type: null,
          rarity: null,
          requiresAttunement: null,
          attunementText: null,
          sourceBook: "DDBuilder legacy",
          itemUrl: item.link,
        }));
      }

      if (enItems.length === 0 || frItems.length === 0) {
        const fallbackItems = await this.loadLegacyItems();

        if (fallbackItems.length > 0) {
          warnings.push(
            `Aidedd listings returned empty data. Used local DDBuilder fallback (${fallbackItems.length} items).`,
          );
          enItems = fallbackItems.map((item) => ({
            lang: "en",
            name: item.name,
            voName: item.name,
            type: null,
            rarity: null,
            requiresAttunement: null,
            attunementText: null,
            sourceBook: "DDBuilder legacy",
            itemUrl: item.link,
          }));
          frItems = fallbackItems.map((item) => ({
            lang: "fr",
            name: item.name,
            voName: item.name,
            type: null,
            rarity: null,
            requiresAttunement: null,
            attunementText: null,
            sourceBook: "DDBuilder legacy",
            itemUrl: item.link,
          }));
        }
      }

      counters.fetchedEn = enItems.length;
      counters.fetchedFr = frItems.length;

      const mergeOutput = mergeMagicItemLocales(enItems, frItems);
      counters.merged = mergeOutput.mergedItems.length;
      warnings.push(...mergeOutput.warnings);

      const detailUrls = mergeOutput.mergedItems.flatMap((item) => [
        item.itemUrlEn ?? "",
        item.itemUrlFr ?? "",
      ]);
      const detailPages = await this.aideddClient.fetchDetailPages(detailUrls);
      const detailByUrl = new Map(
        detailPages.map((page) => [page.url, this.aideddParser.parseDetail(page.html)]),
      );

      const enrichedItems = mergeOutput.mergedItems.map((item) => {
        const detailEn = item.itemUrlEn ? detailByUrl.get(item.itemUrlEn) : undefined;
        const detailFr = item.itemUrlFr ? detailByUrl.get(item.itemUrlFr) : undefined;

        const enriched = {
          ...item,
          descriptionEn: detailEn?.description ?? item.descriptionEn ?? null,
          descriptionFr: detailFr?.description ?? item.descriptionFr ?? null,
          imageUrlEn: detailEn?.imageUrl ?? item.imageUrlEn ?? null,
          imageUrlFr: detailFr?.imageUrl ?? item.imageUrlFr ?? null,
        };

        return {
          ...enriched,
          sourceRowHash: computeMagicItemSourceHash(enriched),
        };
      });

      const syncCounters = await this.magicItemRepository.syncImportedItems(
        enrichedItems,
      );

      counters.inserted = syncCounters.inserted;
      counters.updated = syncCounters.updated;
      counters.unchanged = syncCounters.unchanged;
      counters.deactivated = syncCounters.deactivated;

      await this.magicItemImportRunRepository.update(runId, {
        finishedAt: new Date().toISOString(),
        status: "success",
        counters,
        warnings,
        errors,
      });

      return {
        runId,
        status: "success",
        counters,
        warnings,
        errors,
      };
    } catch (error: unknown) {
      counters.errors += 1;
      errors.push(error instanceof Error ? error.message : "Unknown error");

      await this.magicItemImportRunRepository.update(runId, {
        finishedAt: new Date().toISOString(),
        status: "failed",
        counters,
        warnings,
        errors,
      });

      return {
        runId,
        status: "failed",
        counters,
        warnings,
        errors,
      };
    }
  }
}
