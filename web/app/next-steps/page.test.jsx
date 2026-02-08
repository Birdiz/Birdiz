import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NextStepsPage from "./page";
import { homeContent } from "../../lib/homeContent";

describe("NextStepsPage", () => {
  it("renders roadmap heading and milestones", () => {
    render(<NextStepsPage />);

    expect(
      screen.getByRole("heading", { name: homeContent.nextSteps.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Milestones")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: homeContent.nextSteps.milestones[0].name,
      }),
    ).toBeInTheDocument();
  });
});
