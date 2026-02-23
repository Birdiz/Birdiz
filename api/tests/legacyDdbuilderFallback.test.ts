import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadLegacyDdbuilderFallbackItems } from "../src/magic-items/import/legacyDdbuilderFallback";

describe("loadLegacyDdbuilderFallbackItems", () => {
  it("loads unique name/link entries from table files", async () => {
    const rootDir = await mkdtemp(path.join(os.tmpdir(), "legacy-fallback-"));
    const tablesDir = path.join(
      rootDir,
      "../ddbuilder/src/Enum/Dungeon/Treasure",
    );
    await mkdir(tablesDir, { recursive: true });
    await writeFile(
      path.join(tablesDir, "TableA.php"),
      `<?php
      return [
        ['name' => 'Sac sans fond', 'link' => 'https://example.com/sac'],
        ['name' => 'Sac sans fond', 'link' => 'https://example.com/sac'],
        ['name' => 'Anneau de protection', 'link' => 'https://example.com/anneau'],
      ];`,
      "utf8",
    );

    const items = await loadLegacyDdbuilderFallbackItems(rootDir);

    expect(items).toEqual([
      { name: "Sac sans fond", link: "https://example.com/sac" },
      { name: "Anneau de protection", link: "https://example.com/anneau" },
    ]);
  });
});
