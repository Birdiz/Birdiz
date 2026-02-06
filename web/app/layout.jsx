export const metadata = {
  title: "Birdiz",
  description: "Birdiz dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#0b1020",
          color: "#f8fafc"
        }}
      >
        {children}
      </body>
    </html>
  );
}
