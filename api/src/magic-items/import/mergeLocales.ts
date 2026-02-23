import { createHash } from "node:crypto";
import type { MagicItemDocument, RawListingItem } from "../types/magicItemTypes";
import type { MagicItemMergeOutput } from "./magicItemImportTypes";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function buildMatchKeys(item: RawListingItem): string[] {
  const keys = new Set<string>();
  const nameKey = normalize(item.name);

  if (item.voName) {
    keys.add(`vo:${normalize(item.voName)}`);
  }

  if (nameKey) {
    keys.add(`vo:${nameKey}`);
  }

  if (item.itemUrl) {
    const parsedUrl = item.itemUrl;
    const slugFromQuery =
      parsedUrl.match(/[?&]vo=([^&]+)/i)?.[1] ??
      parsedUrl.match(/[?&]vf=([^&]+)/i)?.[1] ??
      null;
    const lastPath = parsedUrl.split("/").pop() ?? parsedUrl;
    const slug = slugFromQuery ?? lastPath;
    keys.add(`url:${normalize(lastPath)}`);
    keys.add(`slug:${normalize(slug)}`);
  }

  keys.add(`name:${nameKey}:${normalize(item.type ?? "")}`);
  keys.add(`name:${nameKey}`);

  return [...keys];
}

function toCanonicalId(nameEn: string, nameFr: string, type: string | null): string {
  const baseName = nameEn || nameFr;
  const typePart = type ? `-${normalize(type)}` : "";

  return `${normalize(baseName)}${typePart}`;
}

export function computeMagicItemSourceHash(
  item: Omit<MagicItemDocument, "sortOrder">,
): string {
  return createHash("sha256")
    .update(
      JSON.stringify({
        nameEn: item.nameEn,
        nameFr: item.nameFr,
        voName: item.voName,
        type: item.type,
        rarity: item.rarity,
        requiresAttunement: item.requiresAttunement,
        attunementTextEn: item.attunementTextEn,
        attunementTextFr: item.attunementTextFr,
        descriptionEn: item.descriptionEn,
        descriptionFr: item.descriptionFr,
        sourceBook: item.sourceBook,
        itemUrlEn: item.itemUrlEn,
        itemUrlFr: item.itemUrlFr,
        imageUrlEn: item.imageUrlEn,
        imageUrlFr: item.imageUrlFr,
      }),
    )
    .digest("hex");
}

export function mergeMagicItemLocales(
  enItems: RawListingItem[],
  frItems: RawListingItem[],
): MagicItemMergeOutput {
  const frByKey = new Map<string, RawListingItem>();
  const usedFr = new Set<RawListingItem>();
  const mergedItems: Omit<MagicItemDocument, "sortOrder">[] = [];
  const warnings: string[] = [];

  for (const frItem of frItems) {
    for (const key of buildMatchKeys(frItem)) {
      if (!frByKey.has(key)) {
        frByKey.set(key, frItem);
      }
    }
  }

  for (const enItem of enItems) {
    const keys = buildMatchKeys(enItem);
    let frItem: RawListingItem | undefined;

    for (const key of keys) {
      const candidate = frByKey.get(key);

      if (candidate) {
        frItem = candidate;
        break;
      }
    }

    if (!frItem) {
      warnings.push(`No french match found for EN item: ${enItem.name}`);
      continue;
    }

    usedFr.add(frItem);

    const canonicalId = toCanonicalId(enItem.name, frItem.name, enItem.type ?? frItem.type);

    const merged: Omit<MagicItemDocument, "sortOrder"> = {
      canonicalId,
      status: "active",
      nameEn: enItem.name,
      nameFr: frItem.name,
      voName: enItem.voName ?? frItem.voName,
      type: enItem.type ?? frItem.type,
      rarity: enItem.rarity ?? frItem.rarity,
      requiresAttunement:
        enItem.requiresAttunement ?? frItem.requiresAttunement ?? null,
      attunementTextEn: enItem.attunementText,
      attunementTextFr: frItem.attunementText,
      descriptionEn: null,
      descriptionFr: null,
      sourceBook: enItem.sourceBook ?? frItem.sourceBook,
      itemUrlEn: enItem.itemUrl,
      itemUrlFr: frItem.itemUrl,
      imageUrlEn: null,
      imageUrlFr: null,
      keywordsEn: [enItem.rarity, enItem.type].filter(
        (value): value is string => Boolean(value),
      ),
      keywordsFr: [frItem.rarity, frItem.type].filter(
        (value): value is string => Boolean(value),
      ),
    };

    merged.sourceRowHash = computeMagicItemSourceHash(merged);

    mergedItems.push(merged);
  }

  const unmatchedFr = frItems.filter((item) => !usedFr.has(item));

  for (const item of unmatchedFr) {
    warnings.push(`No english match found for FR item: ${item.name}`);
  }

  return {
    mergedItems,
    warnings,
    unmatchedEn: enItems.filter(
      (enItem) =>
        !mergedItems.some(
          (merged) => merged.nameEn === enItem.name && merged.itemUrlEn === enItem.itemUrl,
        ),
    ),
    unmatchedFr,
  };
}
