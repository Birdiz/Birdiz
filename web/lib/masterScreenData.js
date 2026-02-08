import { fetchApiJson } from "./apiClient";

const EMPTY_TRANSPORT = { boats: [], mounts: [], mountEquipments: [] };
const EMPTY_PROPERTIES = { buildings: [], maintenance: [] };

export async function getMasterScreenDamages() {
  const payload = await fetchApiJson("/api/master-screen/damages", { damages: [] });

  return payload.damages || [];
}

export async function getMasterScreenTransport() {
  return fetchApiJson("/api/master-screen/transport", EMPTY_TRANSPORT);
}

export async function getMasterScreenProperties() {
  return fetchApiJson("/api/master-screen/properties", EMPTY_PROPERTIES);
}

export async function getMasterScreenLifestyles() {
  const payload = await fetchApiJson("/api/master-screen/lifestyles", { lifestyles: [] });

  return payload.lifestyles || [];
}
