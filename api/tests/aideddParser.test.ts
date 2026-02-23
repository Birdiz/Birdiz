import { describe, expect, it } from "vitest";
import { AideddParser } from "../src/magic-items/import/aideddParser";

describe("AideddParser", () => {
  it("parses english listing rows", () => {
    const parser = new AideddParser();
    const html = `
      <table>
        <thead>
          <tr>
            <th>Name</th><th>VO</th><th>Type</th><th>Rarity</th><th>Requires attunement</th><th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href="https://example.com/item">Bag of Holding</a></td>
            <td>Bag of Holding</td>
            <td>Wondrous item</td>
            <td>Uncommon</td>
            <td>No</td>
            <td>DMG</td>
          </tr>
        </tbody>
      </table>
    `;

    const result = parser.parseListing(html, "en");

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      lang: "en",
      name: "Bag of Holding",
      voName: "Bag of Holding",
      type: "Wondrous item",
      rarity: "Uncommon",
      requiresAttunement: false,
      sourceBook: "DMG",
      itemUrl: "https://example.com/item",
    });
  });

  it("parses french listing rows", () => {
    const parser = new AideddParser();
    const html = `
      <table>
        <thead>
          <tr>
            <th>Nom</th><th>VO</th><th>Type</th><th>Rareté</th><th>Harmonisation</th><th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href="https://example.com/item-fr">Sac sans fond</a></td>
            <td>Bag of Holding</td>
            <td>Objet merveilleux</td>
            <td>Peu commun</td>
            <td>Non</td>
            <td>Guide du maitre</td>
          </tr>
        </tbody>
      </table>
    `;

    const result = parser.parseListing(html, "fr");

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      lang: "fr",
      name: "Sac sans fond",
      voName: "Bag of Holding",
      type: "Objet merveilleux",
      rarity: "Peu commun",
      requiresAttunement: false,
      sourceBook: "Guide du maitre",
      itemUrl: "https://example.com/item-fr",
    });
  });

  it("parses detail content including description and image", () => {
    const parser = new AideddParser();
    const html = `
      <article>
        <div class="content">
          <p>A bag with extra-dimensional storage.</p>
        </div>
        <img src="/dnd/images-om/bag-of-holding.jpg" alt="bag" />
      </article>
    `;

    const result = parser.parseDetail(html);

    expect(result).toEqual({
      description: "A bag with extra-dimensional storage.",
      imageUrl: "https://www.aidedd.org/dnd/images-om/bag-of-holding.jpg",
    });
  });

  it("parses malformed Aidedd rows via class-based fallback", () => {
    const parser = new AideddParser();
    const html = `
      <table id="liste" class="liste">
        <thead><tr><th>Magic Item</th></tr></thead>
        <tbody>
          <tr><td class="nocel"><input type="checkbox"></td>
          <td class="item"><a href="https://www.aidedd.org/dnd/om.php?vo=bag-of-holding">Bag of Holding</a></td>
          <td class="colT">Wondrous item</td>
          <td class="colR">uncommon</td>
          <td class="colL"></td>
          <td class="colD descr">Holds extra-dimensional storage.</td>
          <td class="colS">Dungeon Master´s Guide (SRD)</td>
          <tr><td class="nocel"><input type="checkbox"></td>
          <td class="item"><a href="https://www.aidedd.org/dnd/om.php?vo=amulet-of-health">Amulet of Health</a></td>
          <td class="colT">Wondrous item</td>
          <td class="colR">rare</td>
          <td class="colL">Attunement</td>
          <td class="colD descr"></td>
          <td class="colS">Dungeon Master´s Guide (SRD)</td>
        </tbody>
      </table>
    `;

    const result = parser.parseListing(html, "en");

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      name: "Bag of Holding",
      type: "Wondrous item",
      rarity: "uncommon",
      requiresAttunement: null,
      itemUrl: "https://www.aidedd.org/dnd/om.php?vo=bag-of-holding",
    });
    expect(result[1]).toMatchObject({
      name: "Amulet of Health",
      requiresAttunement: true,
      attunementText: "Attunement",
    });
  });
});
