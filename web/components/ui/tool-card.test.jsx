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
        status="Live"
        meta={["DM"]}
        ctaLabel="Open tool"
        featureImage="/features/master-screen.svg"
      />,
    );

    const cardArt = screen.getByTestId("tool-card-art");

    expect(cardArt).toBeInTheDocument();
    expect(cardArt.getAttribute("style")).toContain("/features/master-screen.svg");
  });
});
