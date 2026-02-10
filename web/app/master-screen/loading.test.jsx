import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MasterScreenLoading from "../[locale]/master-screen/loading";

describe("LocalizedMasterScreenLoading", () => {
  it("renders a route-level skeleton layout while data is loading", () => {
    render(<MasterScreenLoading />);

    expect(screen.getByTestId("master-screen-loading")).toHaveAttribute("aria-busy", "true");
    expect(screen.getAllByTestId("skeleton-nav-card")).toHaveLength(4);
  });
});
