import { describe, expect, it } from "vitest";
import { getIntl } from "./intl";

describe("getIntl", () => {
  it("falls back to default locale for invalid locale values", () => {
    const intl = getIntl("favicon.ico");

    expect(intl.locale).toBe("en");
    expect(intl.formatMessage({ id: "app.projectName" })).toBe("DDBuilder");
  });
});
