import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export interface LegacyDdbuilderItem {
  name: string;
  link: string;
}

const TABLE_FILENAME_PATTERN = /^Table[A-I]\.php$/;

function decodePhpString(value: string): string {
  return value.replace(/\\'/g, "'").trim();
}

export async function loadLegacyDdbuilderFallbackItems(
  rootDir = process.cwd(),
): Promise<LegacyDdbuilderItem[]> {
  const tablesDir = path.resolve(
    rootDir,
    "../ddbuilder/src/Enum/Dungeon/Treasure",
  );
  let files: string[] = [];

  try {
    files = await readdir(tablesDir);
  } catch {
    return [];
  }

  const tableFiles = files
    .filter((file) => TABLE_FILENAME_PATTERN.test(file))
    .map((file) => path.join(tablesDir, file))
    .sort();
  const items: LegacyDdbuilderItem[] = [];
  const seen = new Set<string>();

  for (const filePath of tableFiles) {
    const content = await readFile(filePath, "utf8");
    const regex =
      /'name'\s*=>\s*'((?:\\'|[^'])*)'[\s\S]*?'link'\s*=>\s*'((?:\\'|[^'])*)'/g;
    let match = regex.exec(content);

    while (match) {
      const name = decodePhpString(match[1]);
      const link = decodePhpString(match[2]);
      const key = `${name}::${link}`;

      if (name.length > 0 && link.length > 0 && !seen.has(key)) {
        seen.add(key);
        items.push({ name, link });
      }

      match = regex.exec(content);
    }
  }

  return items;
}
