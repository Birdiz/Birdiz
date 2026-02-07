import HomeShell from "../components/home-shell";
import { homeContent } from "../lib/homeContent";

export default function HomePage() {
  return <HomeShell content={homeContent} />;
}
