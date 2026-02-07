import "./globals.css";

export const metadata = {
  title: "Birdiz | Donjons & Dragons Toolkit",
  description: "Modern medieval companion project for Donjons & Dragons players and Dungeon Masters."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
