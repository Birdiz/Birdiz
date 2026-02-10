import type {
  SearchDocument,
  SearchDocumentProvider,
  SearchEntityType,
  SearchModule,
  SearchQuery,
  SearchResponse,
  SearchResult,
  SearchSection,
} from "../types/searchTypes";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9]+/g)
    .filter(Boolean);
}

function createFacet<TValue extends string>(
  values: TValue[],
): Array<{ value: TValue; count: number }> {
  const counts = new Map<TValue, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((left, right) =>
      left.count === right.count
        ? left.value.localeCompare(right.value)
        : right.count - left.count,
    );
}

function scoreDocument(
  document: SearchDocument,
  queryTokens: string[],
  normalizedQuery: string,
): number {
  if (queryTokens.length === 0) {
    return document.weight;
  }

  const title = normalize(document.title);
  const body = normalize(document.body);
  const keywords = document.keywords.map(normalize);
  const haystack = `${title} ${body} ${keywords.join(" ")}`;

  let score = document.weight;

  if (normalizedQuery.length > 0) {
    if (title === normalizedQuery) {
      score += 80;
    } else if (title.startsWith(normalizedQuery)) {
      score += 40;
    } else if (title.includes(normalizedQuery)) {
      score += 20;
    }

    if (keywords.some((keyword) => keyword === normalizedQuery)) {
      score += 20;
    }
  }

  for (const token of queryTokens) {
    if (!haystack.includes(token)) {
      return 0;
    }

    if (title === token) {
      score += 40;
      continue;
    }

    if (title.startsWith(token)) {
      score += 25;
      continue;
    }

    if (title.includes(token)) {
      score += 12;
      continue;
    }

    if (keywords.some((keyword) => keyword.includes(token))) {
      score += 8;
      continue;
    }

    score += 3;
  }

  return score;
}

function applyStructuredFilters(
  documents: SearchDocument[],
  query: SearchQuery,
): SearchDocument[] {
  return documents.filter((document) => {
    if (document.locale !== query.locale) {
      return false;
    }

    if (query.module && document.module !== query.module) {
      return false;
    }

    if (query.section && document.section !== query.section) {
      return false;
    }

    if (query.entityType && document.entityType !== query.entityType) {
      return false;
    }

    return true;
  });
}

export class SearchService {
  private readonly providers: SearchDocumentProvider[];

  constructor(providers: SearchDocumentProvider[]) {
    this.providers = providers;
  }

  async search(query: SearchQuery): Promise<SearchResponse> {
    const allDocuments = (
      await Promise.all(
        this.providers.map((provider) => provider.getDocuments(query.locale)),
      )
    ).flat();
    const filtered = applyStructuredFilters(allDocuments, query);
    const normalizedQuery = normalize(query.q);
    const queryTokens = tokenize(query.q);

    const scored = filtered
      .map((document): SearchResult | null => {
        const score = scoreDocument(document, queryTokens, normalizedQuery);

        if (score <= 0) {
          return null;
        }

        return { ...document, score };
      })
      .filter((value): value is SearchResult => value !== null)
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }

        if (right.weight !== left.weight) {
          return right.weight - left.weight;
        }

        return left.title.localeCompare(right.title);
      });

    const paginated = scored.slice(query.offset, query.offset + query.limit);

    return {
      query,
      total: scored.length,
      results: paginated,
      facets: {
        modules: createFacet<SearchModule>(scored.map((result) => result.module)),
        sections: createFacet<SearchSection>(scored.map((result) => result.section)),
        entityTypes: createFacet<SearchEntityType>(
          scored.map((result) => result.entityType),
        ),
      },
    };
  }
}
