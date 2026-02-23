import { fetchApiJson } from "./apiClient";
import { resolveLocale } from "./i18n/locales";

const EMPTY_TRANSPORT = { boats: [], mounts: [], mountEquipments: [] };
const EMPTY_PROPERTIES = { buildings: [], maintenance: [] };
const ISR_OPTIONS = { next: { revalidate: 3600 } };

export async function getMasterScreenDamages(locale) {
  const safeLocale = resolveLocale(locale);
  const params = new URLSearchParams({ locale: safeLocale });
  const payload = await fetchApiJson(
    `/api/master-screen/damages?${params}`,
    { damages: [] },
    ISR_OPTIONS,
  );

  return payload.damages || [];
}

export async function getMasterScreenTransport(locale) {
  const safeLocale = resolveLocale(locale);
  const params = new URLSearchParams({ locale: safeLocale });
  return fetchApiJson(`/api/master-screen/transport?${params}`, EMPTY_TRANSPORT, ISR_OPTIONS);
}

export async function getMasterScreenProperties(locale) {
  const safeLocale = resolveLocale(locale);
  const params = new URLSearchParams({ locale: safeLocale });
  return fetchApiJson(`/api/master-screen/properties?${params}`, EMPTY_PROPERTIES, ISR_OPTIONS);
}

export async function getMasterScreenLifestyles(locale) {
  const safeLocale = resolveLocale(locale);
  const params = new URLSearchParams({ locale: safeLocale });
  const payload = await fetchApiJson(`/api/master-screen/lifestyles?${params}`, {
    lifestyles: [],
  }, ISR_OPTIONS);

  return payload.lifestyles || [];
}
