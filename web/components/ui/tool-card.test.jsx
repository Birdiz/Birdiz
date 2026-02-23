import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ToolCard from "./tool-card";

describe("ToolCard", () => {
  it("renders feature artwork when provided", () => {
    render(
      <ToolCard
        title="Master Screen"
        description="Reference dashboards for active sessions."
        href="/en/master-screen"
        meta={["DM"]}
        ctaLabel="Open tool"
        featureImage="/features/master-screen.svg"
      />,
    );

    const cardArt = screen.getByTestId("tool-card-art");
    const ctaLinks = screen.getAllByRole("link", { name: "Open tool" });

    expect(cardArt).toBeInTheDocument();
    expect(cardArt.getAttribute("style")).toContain("/features/master-screen.svg");
    expect(ctaLinks).toHaveLength(1);
    expect(ctaLinks[0]).toHaveClass("rounded-full");
    expect(ctaLinks[0]).toHaveAttribute("href", "/en/master-screen");
  });
});
