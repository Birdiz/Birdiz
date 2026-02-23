import type { SupportedLocale } from "../../master-screen/utils/locale";
import type { RawListingItem } from "../types/magicItemTypes";

export interface ParsedAideddDetail {
  description: string | null;
  imageUrl: string | null;
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&eacute;/g, "e")
    .replace(/&egrave;/g, "e")
    .replace(/&ecirc;/g, "e")
    .replace(/&agrave;/g, "a")
    .replace(/&ccedil;/g, "c")
    .replace(/&rsquo;/g, "'")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    );
}

function stripTags(value: string): string {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractTable(html: string): string {
  const tableMatch = html.match(/<table[^>]*>[\s\S]*?<\/table>/i);

  return tableMatch?.[0] ?? "";
}

function extractRows(tableHtml: string): string[] {
  return [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map(
    (match) => match[1],
  );
}

function extractCells(rowHtml: string): string[] {
  return [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(
    (match) => match[1],
  );
}

function extractHeaders(tableHtml: string): string[] {
  return [...tableHtml.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((match) =>
    stripTags(match[1]),
  );
}

function findColumnIndex(headers: string[], locale: SupportedLocale, type: string): number {
  const normalizedHeaders = headers.map((header) => header.toLowerCase());

  const candidates: Record<string, string[]> = {
    name: locale === "en" ? ["name"] : ["nom"],
    vo: ["vo", "original"],
    type: ["type"],
    rarity: locale === "en" ? ["rarity"] : ["rarete", "rareté"],
    attunement:
      locale === "en"
        ? ["attunement", "requires attunement"]
        : ["harmonisation", "lien"],
    source: locale === "en" ? ["source", "book"] : ["source", "manuel"],
  };

  const words = candidates[type] ?? [];

  return normalizedHeaders.findIndex((header) =>
    words.some((word) => header.includes(word)),
  );
}

function toNullable(value: string): string | null {
  const cleaned = value.trim();

  return cleaned.length > 0 && cleaned !== "-" ? cleaned : null;
}

function parseAttunement(value: string): { requiresAttunement: boolean | null; text: string | null } {
  const normalized = value.toLowerCase();

  if (!normalized) {
    return { requiresAttunement: null, text: null };
  }

  if (normalized.includes("yes") || normalized.includes("oui") || normalized.includes("requires")) {
    return { requiresAttunement: true, text: value };
  }

  if (normalized.includes("no") || normalized.includes("non")) {
    return { requiresAttunement: false, text: null };
  }

  return { requiresAttunement: true, text: value };
}

function extractLink(cellHtml: string): string | null {
  const hrefMatch = cellHtml.match(/href=["']([^"']+)["']/i);

  return hrefMatch ? hrefMatch[1] : null;
}

function extractCellByClass(rowHtml: string, className: string): string | null {
  const pattern = new RegExp(
    `<td[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/td>`,
    "i",
  );
  const match = rowHtml.match(pattern);

  return match ? match[1] : null;
}

function extractRawRows(tableHtml: string): string[] {
  const rows = tableHtml.match(
    /<tr[^>]*>\s*<td[^>]*class=["'][^"']*\bnocel\b[^"']*["'][^>]*>[\s\S]*?(?=<tr[^>]*>\s*<td[^>]*class=["'][^"']*\bnocel\b[^"']*["'][^>]*>|<\/tbody>)/gi,
  );

  return rows ?? [];
}

function resolveImageUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  if (url.startsWith("/")) {
    return `https://www.aidedd.org${url}`;
  }

  return `https://www.aidedd.org/${url}`;
}

export class AideddParser {
  private parseListingByHeaders(
    tableHtml: string,
    locale: SupportedLocale,
  ): RawListingItem[] {
    const headers = extractHeaders(tableHtml);
    const rows = extractRows(tableHtml);

    const nameColumn = findColumnIndex(headers, locale, "name");
    const voColumn = findColumnIndex(headers, locale, "vo");
    const typeColumn = findColumnIndex(headers, locale, "type");
    const rarityColumn = findColumnIndex(headers, locale, "rarity");
    const attunementColumn = findColumnIndex(headers, locale, "attunement");
    const sourceColumn = findColumnIndex(headers, locale, "source");

    return rows
      .map((row) => {
        const cells = extractCells(row);

        if (cells.length === 0 || nameColumn < 0 || !cells[nameColumn]) {
          return null;
        }

        const nameCell = cells[nameColumn];
        const name = stripTags(nameCell);

        if (!name) {
          return null;
        }

        const attunementCell = attunementColumn >= 0 ? stripTags(cells[attunementColumn] ?? "") : "";
        const attunement = parseAttunement(attunementCell);

        return {
          lang: locale,
          name,
          voName: voColumn >= 0 ? toNullable(stripTags(cells[voColumn] ?? "")) : null,
          type: typeColumn >= 0 ? toNullable(stripTags(cells[typeColumn] ?? "")) : null,
          rarity: rarityColumn >= 0 ? toNullable(stripTags(cells[rarityColumn] ?? "")) : null,
          requiresAttunement: attunement.requiresAttunement,
          attunementText: attunement.text,
          sourceBook: sourceColumn >= 0 ? toNullable(stripTags(cells[sourceColumn] ?? "")) : null,
          itemUrl: extractLink(nameCell),
        } as RawListingItem;
      })
      .filter((item): item is RawListingItem => item !== null);
  }

  private parseListingByClasses(html: string, locale: SupportedLocale): RawListingItem[] {
    const tableHtml = extractTable(html);
    const rows = extractRawRows(tableHtml);

    return rows
      .map((rowHtml) => {
        const nameCell = extractCellByClass(rowHtml, "item");

        if (!nameCell) {
          return null;
        }

        const name = stripTags(nameCell);

        if (!name) {
          return null;
        }

        const attunementCell = stripTags(extractCellByClass(rowHtml, "colL") ?? "");
        const attunement = parseAttunement(attunementCell);
        const voCell = extractCellByClass(rowHtml, "colVO");

        return {
          lang: locale,
          name,
          voName: voCell ? toNullable(stripTags(voCell)) : null,
          type: toNullable(stripTags(extractCellByClass(rowHtml, "colT") ?? "")),
          rarity: toNullable(stripTags(extractCellByClass(rowHtml, "colR") ?? "")),
          requiresAttunement: attunement.requiresAttunement,
          attunementText: attunement.text,
          sourceBook: toNullable(stripTags(extractCellByClass(rowHtml, "colS") ?? "")),
          itemUrl: extractLink(nameCell),
        } as RawListingItem;
      })
      .filter((item): item is RawListingItem => item !== null);
  }

  parseListing(html: string, locale: SupportedLocale): RawListingItem[] {
    const tableHtml = extractTable(html);

    if (!tableHtml) {
      return [];
    }

    const headerItems = this.parseListingByHeaders(tableHtml, locale);

    if (headerItems.length > 0) {
      return headerItems;
    }

    return this.parseListingByClasses(html, locale);
  }

  parseDetail(html: string): ParsedAideddDetail {
    const descriptionMatch =
      html.match(/<div[^>]*class=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ??
      html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ??
      html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const imageMatch = html.match(
      /<img[^>]*(?:class=["'][^"']*magic[^"']*["'][^>]*)?src=["']([^"']+)["'][^>]*>/i,
    );

    return {
      description: descriptionMatch ? toNullable(stripTags(descriptionMatch[1])) : null,
      imageUrl: imageMatch ? resolveImageUrl(imageMatch[1]) : null,
    };
  }
}
