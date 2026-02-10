import type { SearchDocumentProvider } from "../types/searchTypes";
import { MasterScreenSearchDocumentProvider } from "./masterScreenSearchDocumentProvider";
import { NavigationSearchDocumentProvider } from "./navigationSearchDocumentProvider";

export function createSearchProviders(): SearchDocumentProvider[] {
  return [
    new NavigationSearchDocumentProvider(),
    new MasterScreenSearchDocumentProvider(),
  ];
}
