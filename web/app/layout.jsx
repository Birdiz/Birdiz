import "./globals.css";
import { getSiteUrl } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "DDBuilder",
  description: "Practical D20 toolkit for players and Dungeon Masters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
