import HomeShell from "../components/home-shell";
import { homeContent } from "../lib/homeContent";

async function getMasterScreenDamages() {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

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

export default async function HomePage() {
  const damages = await getMasterScreenDamages();

  return (
    <HomeShell content={{ ...homeContent, masterScreenDamages: damages }} />
  );
}
