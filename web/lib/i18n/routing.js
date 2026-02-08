import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./locales";

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalized.length > 1 && normalized.endsWith("/")
    ? normalized.slice(0, -1)
    : normalized;
}

export function getLocalePath(pathname, targetLocale) {
  const normalizedPath = normalizePathname(pathname);
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (SUPPORTED_LOCALES.includes(segments[0])) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }

  if (targetLocale === DEFAULT_LOCALE) {
    return normalizedPath;
  }

  return `/${targetLocale}${normalizedPath}`;
}
