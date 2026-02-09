import { describe, expect, it } from "vitest";
import { NavigationSearchDocumentProvider } from "../src/search/providers/navigationSearchDocumentProvider";

describe("NavigationSearchDocumentProvider", () => {
  it("returns localized navigation pages with locale-aware routes", async () => {
    const provider = new NavigationSearchDocumentProvider();

    const frDocs = await provider.getDocuments("fr");
    const enDocs = await provider.getDocuments("en");

    expect(frDocs).toHaveLength(3);
    expect(enDocs).toHaveLength(3);
    expect(frDocs.find((doc) => doc.section === "master-screen")?.title).toBe(
      "Écran MJ",
    );
    expect(enDocs.find((doc) => doc.section === "master-screen")?.title).toBe(
      "Master Screen",
    );
    expect(frDocs.find((doc) => doc.section === "home")?.href).toBe("/fr");
    expect(enDocs.find((doc) => doc.section === "next-steps")?.href).toBe(
      "/en/next-steps",
    );
  });
});
