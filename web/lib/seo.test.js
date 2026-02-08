import { describe, expect, it } from "vitest";
import { buildSeoMetadata } from "./seo";

describe("buildSeoMetadata", () => {
  it("builds canonical and language alternates for home", () => {
    const metadata = buildSeoMetadata({
      locale: "en",
      pathname: "/",
      titleId: "seo.home.title",
      descriptionId: "seo.home.description",
    });

    expect(metadata.title).toBe("Home | DDBuilder");
    expect(metadata.alternates.canonical).toContain("/en");
    expect(metadata.alternates.languages.fr).toContain("/fr");
    expect(metadata.alternates.languages["x-default"]).toContain("/en");
  });

  it("supports localized page path metadata", () => {
    const metadata = buildSeoMetadata({
      locale: "fr",
      pathname: "/master-screen",
      titleId: "seo.masterScreen.title",
      descriptionId: "seo.masterScreen.description",
    });

    expect(metadata.title).toBe("Écran MJ | DDBuilder");
    expect(metadata.alternates.canonical).toContain("/fr/master-screen");
    expect(metadata.alternates.languages.en).toContain("/en/master-screen");
  });
});
