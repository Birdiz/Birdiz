import { fetchApiJson } from "./apiClient";
import { resolveLocale } from "./i18n/locales";

const EMPTY_TRANSPORT = { boats: [], mounts: [], mountEquipments: [] };
const EMPTY_PROPERTIES = { buildings: [], maintenance: [] };

export async function getMasterScreenDamages(locale) {
  const safeLocale = resolveLocale(locale);
  const payload = await fetchApiJson(
    `/api/master-screen/damages?locale=${safeLocale}`,
    { damages: [] },
  );

  return payload.damages || [];
}

export async function getMasterScreenTransport(locale) {
  const safeLocale = resolveLocale(locale);
  return fetchApiJson(`/api/master-screen/transport?locale=${safeLocale}`, EMPTY_TRANSPORT);
}

export async function getMasterScreenProperties(locale) {
  const safeLocale = resolveLocale(locale);
  return fetchApiJson(`/api/master-screen/properties?locale=${safeLocale}`, EMPTY_PROPERTIES);
}

export async function getMasterScreenLifestyles(locale) {
  const safeLocale = resolveLocale(locale);
  const payload = await fetchApiJson(`/api/master-screen/lifestyles?locale=${safeLocale}`, {
    lifestyles: [],
  });

  return payload.lifestyles || [];
}
