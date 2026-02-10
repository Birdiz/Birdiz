import { describe, expect, it } from "vitest";
import { MasterScreenSearchDocumentProvider } from "../src/search/providers/masterScreenSearchDocumentProvider";

describe("MasterScreenSearchDocumentProvider", () => {
  it("uses localized section labels in document keywords", async () => {
    const provider = new MasterScreenSearchDocumentProvider();

    const frDocs = await provider.getDocuments("fr");
    const enDocs = await provider.getDocuments("en");

    expect(frDocs.find((doc) => doc.section === "damages")?.keywords).toContain(
      "Dégâts",
    );
    expect(frDocs.find((doc) => doc.section === "properties")?.keywords).toContain(
      "Propriétés",
    );
    expect(frDocs.find((doc) => doc.section === "lifestyles")?.keywords).toContain(
      "Modes de vie",
    );

    expect(enDocs.find((doc) => doc.section === "damages")?.keywords).toContain(
      "Damages",
    );
    expect(enDocs.find((doc) => doc.section === "properties")?.keywords).toContain(
      "Properties",
    );
    expect(enDocs.find((doc) => doc.section === "lifestyles")?.keywords).toContain(
      "Lifestyles",
    );
  });
});
