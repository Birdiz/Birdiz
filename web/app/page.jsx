"use client";

import { useEffect, useState } from "react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function HomePage() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/summary`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setSummary(data);
      } catch (fetchError) {
        setError(fetchError.message);
      }
    };

    fetchSummary();
  }, []);

  return (
    <main style={{ minHeight: "100vh", padding: "48px" }}>
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          backgroundColor: "#111827",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 24px 48px rgba(15, 23, 42, 0.35)"
        }}
      >
        <p style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "12px" }}>
          Birdiz Dashboard
        </p>
        <h1 style={{ fontSize: "36px", marginBottom: "16px" }}>Revamp starter kit</h1>
        <p style={{ lineHeight: 1.6, marginBottom: "24px", color: "#cbd5f5" }}>
          This Next.js frontend talks to the Node/Express API and MongoDB. Use it as a base
          for recreating the D&amp;D builder workflow in a modern stack.
        </p>

        <div style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "18px", marginTop: 0 }}>API Status</h2>
          {error ? (
            <p style={{ color: "#f87171" }}>Unable to reach API: {error}</p>
          ) : summary ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#e2e8f0" }}>
              <li>
                <strong>Message:</strong> {summary.message}
              </li>
              <li>
                <strong>Database:</strong> {summary.database}
              </li>
              <li>
                <strong>Collections:</strong> {summary.collections?.length ? summary.collections.join(", ") : "(none)"}
              </li>
            </ul>
          ) : (
            <p style={{ color: "#93c5fd" }}>Loading API summary...</p>
          )}
        </div>
      </section>
    </main>
  );
}
