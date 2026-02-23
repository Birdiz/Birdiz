import type { SearchDocumentProvider } from "../types/searchTypes";
import type { MagicItemService } from "../../magic-items/services/magicItemService";
import { MasterScreenSearchDocumentProvider } from "./masterScreenSearchDocumentProvider";
import { MagicItemsSearchDocumentProvider } from "./magicItemsSearchDocumentProvider";
import { NavigationSearchDocumentProvider } from "./navigationSearchDocumentProvider";

interface SearchProvidersOptions {
  magicItemService: MagicItemService;
}

export function createSearchProviders({
  magicItemService,
}: SearchProvidersOptions): SearchDocumentProvider[] {
  return [
    new NavigationSearchDocumentProvider(),
    new MasterScreenSearchDocumentProvider(),
    new MagicItemsSearchDocumentProvider(magicItemService),
  ];
}
