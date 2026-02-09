"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { fetchSearchResults } from "../../lib/apiClient";

const SEARCH_CACHE_TTL_MS = 30_000;

function getSectionLabel(intl, section) {
  switch (section) {
    case "home":
      return intl.formatMessage({ id: "search.section.home" });
    case "master-screen":
      return intl.formatMessage({ id: "search.section.masterScreen" });
    case "next-steps":
      return intl.formatMessage({ id: "search.section.nextSteps" });
    case "damages":
      return intl.formatMessage({ id: "search.section.damages" });
    case "transport":
      return intl.formatMessage({ id: "search.section.transport" });
    case "properties":
      return intl.formatMessage({ id: "search.section.properties" });
    case "lifestyles":
      return intl.formatMessage({ id: "search.section.lifestyles" });
    default:
      return section;
  }
}

function truncateSnippet(value) {
  if (value.length <= 140) {
    return value;
  }

  return `${value.slice(0, 137)}...`;
}

export default function GlobalSearch({ locale, onNavigate }) {
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [hasRequested, setHasRequested] = useState(false);
  const cacheRef = useRef(new Map());

  const trimmedQuery = query.trim();

  useEffect(() => {
    const normalizedQuery = trimmedQuery.toLowerCase();
    const cacheKey = `${locale}:${normalizedQuery}`;
    const cachedValue = cacheRef.current.get(cacheKey);
    const now = Date.now();
    const abortController = new AbortController();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      setHasRequested(false);
      return () => abortController.abort();
    }

    if (cachedValue && now - cachedValue.cachedAt < SEARCH_CACHE_TTL_MS) {
      setHasRequested(true);
      setError(cachedValue.error);
      setResults(cachedValue.results);
      return () => abortController.abort();
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setHasRequested(true);
      setError(null);

      try {
        const payload = await fetchSearchResults({
          q: trimmedQuery,
          locale,
          limit: 8,
          signal: abortController.signal,
        });

        const nextResults = payload.results || [];
        const nextError = payload.error
          ? intl.formatMessage({ id: "search.error" })
          : null;

        cacheRef.current.set(cacheKey, {
          cachedAt: Date.now(),
          results: nextResults,
          error: nextError,
        });

        setResults(nextResults);
        setError(nextError);
      } catch (requestError) {
        if (requestError instanceof Error && requestError.name === "AbortError") {
          return;
        }

        setResults([]);
        setError(intl.formatMessage({ id: "search.error" }));
      } finally {
        setIsLoading(false);
      }
    }, 220);

    return () => {
      abortController.abort();
      clearTimeout(timeoutId);
    };
  }, [intl, locale, trimmedQuery]);

  const sectionedResults = useMemo(() => {
    return results.reduce((accumulator, result) => {
      const groupKey = result.section;
      const existing = accumulator.get(groupKey) ?? [];
      existing.push(result);
      accumulator.set(groupKey, existing);
      return accumulator;
    }, new Map());
  }, [results]);

  return (
    <div className="mt-6 border-t border-[var(--line)] pt-4">
      <label
        htmlFor="global-search-input"
        className="m-0 mb-2 block text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase"
      >
        {intl.formatMessage({ id: "search.label" })}
      </label>
      <input
        id="global-search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={intl.formatMessage({ id: "search.placeholder" })}
        className="w-full rounded-[10px] border border-[var(--line)] bg-[rgba(14,10,7,0.9)] px-3 py-2 text-sm text-[var(--text-main)] outline-none transition focus:border-[var(--line-strong)]"
      />

      {trimmedQuery.length < 2 ? (
        <p className="m-0 mt-2 text-xs text-[var(--text-muted)]">
          {intl.formatMessage({ id: "search.hint" })}
        </p>
      ) : null}

      {isLoading ? (
        <p className="m-0 mt-3 text-sm text-[var(--text-soft)]">
          {intl.formatMessage({ id: "search.loading" })}
        </p>
      ) : null}

      {!isLoading && error ? (
        <p className="m-0 mt-3 text-sm text-[var(--text-soft)]">{error}</p>
      ) : null}

      {!isLoading && hasRequested && !error && results.length === 0 ? (
        <p className="m-0 mt-3 text-sm text-[var(--text-soft)]">
          {intl.formatMessage({ id: "search.noResults" })}
        </p>
      ) : null}

      {!isLoading && !error && results.length > 0 ? (
        <div className="mt-3 grid gap-3">
          {[...sectionedResults.entries()].map(([section, sectionItems]) => (
            <div key={section}>
              <p className="m-0 mb-1 text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase">
                {getSectionLabel(intl, section)}
              </p>
              <ul className="m-0 grid list-none gap-1 p-0">
                {sectionItems.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={result.href}
                      onClick={onNavigate}
                      className="block rounded-[10px] border border-transparent px-2 py-1.5 no-underline transition hover:border-[var(--line)] hover:bg-[rgba(34,27,20,0.7)]"
                    >
                      <span className="text-sm text-[var(--text-main)]">{result.title}</span>
                      <p className="m-0 mt-0.5 text-xs leading-5 text-[var(--text-muted)]">
                        {truncateSnippet(result.body)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
