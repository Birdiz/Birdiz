import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHero from "./page-hero";

describe("PageHero", () => {
  it("renders an atmosphere strip when a background image is provided", () => {
    render(
      <PageHero
        eyebrow="Session Utility Suite"
        title="Tools first. Lore second."
        description="DDBuilder streamlines in-session decisions."
        badges={["D20 focused"]}
        art="Lightweight utility blocks."
        backgroundImage="/ambiance/hero-atmosphere.svg"
      />,
    );

    const atmosphere = screen.getByTestId("hero-atmosphere");

    expect(atmosphere).toBeInTheDocument();
    expect(atmosphere.getAttribute("style")).toContain("/ambiance/hero-atmosphere.svg");
  });
});
