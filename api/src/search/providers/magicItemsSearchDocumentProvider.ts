import type { SupportedLocale } from "../../master-screen/utils/locale";
import type { MagicItemService } from "../../magic-items/services/magicItemService";
import type { SearchDocument, SearchDocumentProvider } from "../types/searchTypes";

function toAnchor(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export class MagicItemsSearchDocumentProvider implements SearchDocumentProvider {
  private readonly magicItemService: MagicItemService;

  constructor(magicItemService: MagicItemService) {
    this.magicItemService = magicItemService;
  }

  async getDocuments(locale: SupportedLocale): Promise<SearchDocument[]> {
    const { items } = await this.magicItemService.getMagicItems({
      locale,
      q: "",
      rarity: null,
      type: null,
      attunement: null,
      status: "active",
      limit: 10000,
      offset: 0,
    });

    return items.map((item) => ({
      id: `magic-item-${item.canonicalId}-${locale}`,
      locale,
      module: "magic-items",
      section: "magic-trading-post",
      entityType: "magic-item",
      title: item.name,
      body: [
        item.voName,
        item.type,
        item.rarity,
        item.attunementText,
        item.description,
        item.sourceBook,
      ]
        .filter((value): value is string => Boolean(value))
        .join(" "),
      keywords: [
        ...item.keywords,
        item.rarity ?? "",
        item.type ?? "",
        item.voName ?? "",
        locale === "en" ? "magic item" : "objet magique",
      ].filter(Boolean),
      href: `/${locale}/magic-trading-post?item=${encodeURIComponent(item.canonicalId)}`,
      anchor: toAnchor(item.canonicalId),
      weight: 95,
      metadata: {
        canonicalId: item.canonicalId,
        rarity: item.rarity ?? "",
        type: item.type ?? "",
      },
    }));
  }
}
