export async function getMasterScreenDamages() {
  const apiBaseUrl =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:4000";

  try {
    const response = await fetch(`${apiBaseUrl}/api/master-screen/damages`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return payload.damages || [];
  } catch {
    return [];
  }
}
