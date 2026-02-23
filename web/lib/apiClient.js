function getApiBaseUrl() {
  return (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:4000"
  );
}

async function fetchApiJsonWithMeta(path, fallbackValue, options = {}) {
  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...(options.next ? { next: options.next } : { cache: "no-store" }),
      signal: options.signal,
    });

    if (!response.ok) {
      return {
        data: fallbackValue,
        error: `http_${response.status}`,
      };
    }

    return {
      data: await response.json(),
      error: null,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }

    return {
      data: fallbackValue,
      error: "network_error",
    };
  }
}

export async function fetchApiJson(path, fallbackValue, options = {}) {
  const { data } = await fetchApiJsonWithMeta(path, fallbackValue, options);
  return data;
}

const EMPTY_SEARCH_RESPONSE = {
  query: {
    q: "",
    locale: "en",
    module: null,
    section: null,
    entityType: null,
    limit: 0,
    offset: 0,
  },
  total: 0,
  results: [],
  facets: {
    modules: [],
    sections: [],
    entityTypes: [],
  },
};

export async function fetchSearchResults({
  q,
  locale,
  module = null,
  section = null,
  entityType = null,
  limit = 8,
  offset = 0,
  signal,
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("q", q);
  searchParams.set("locale", locale);
  searchParams.set("limit", String(limit));
  searchParams.set("offset", String(offset));

  if (module) {
    searchParams.set("module", module);
  }

  if (section) {
    searchParams.set("section", section);
  }

  if (entityType) {
    searchParams.set("entityType", entityType);
  }

  const { data, error } = await fetchApiJsonWithMeta(
    `/api/search?${searchParams.toString()}`,
    EMPTY_SEARCH_RESPONSE,
    { signal },
  );

  return {
    ...data,
    error,
  };
}
