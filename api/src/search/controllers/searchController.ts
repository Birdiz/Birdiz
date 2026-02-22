import type { RequestHandler } from "express";
import type { SearchService } from "../services/searchService";
import { parseSearchQuery } from "../utils/searchQuery";
import { getErrorMessage } from "../../utils/error";

interface SearchControllerOptions {
  searchService: SearchService;
}

export function createSearchController({
  searchService,
}: SearchControllerOptions): RequestHandler {
  return async function searchController(req, res): Promise<void> {
    try {
      const query = parseSearchQuery(req);
      const payload = await searchService.search(query);
      res.json(payload);
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to execute search query",
        error: getErrorMessage(error),
      });
    }
  };
}
