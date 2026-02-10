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

  it("localizes document titles by locale", async () => {
    const provider = new MasterScreenSearchDocumentProvider();

    const frDocs = await provider.getDocuments("fr");
    const enDocs = await provider.getDocuments("en");

    expect(
      frDocs.some((doc) => doc.entityType === "boat" && doc.title === "Barque"),
    ).toBe(true);
    expect(
      enDocs.some((doc) => doc.entityType === "boat" && doc.title === "Rowboat"),
    ).toBe(true);
  });

  it("localizes currency units in english search bodies", async () => {
    const provider = new MasterScreenSearchDocumentProvider();
    const enDocs = await provider.getDocuments("en");

    const boatDoc = enDocs.find(
      (doc) => doc.entityType === "boat" && doc.title === "Rowboat",
    );

    expect(boatDoc?.body).toContain("GP");
    expect(boatDoc?.body).toContain("SP");
  });
});
