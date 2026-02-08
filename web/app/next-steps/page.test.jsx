import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NextStepsPage from "./page";
import { homeContent } from "../../lib/homeContent";

describe("NextStepsPage", () => {
  it("renders next steps heading and copy", () => {
    render(<NextStepsPage />);

    expect(screen.getByRole("heading", { name: /Next Steps/ })).toBeInTheDocument();
    expect(screen.getByText(homeContent.nextSteps)).toBeInTheDocument();
  });
});
