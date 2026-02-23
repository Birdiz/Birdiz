import Link from "next/link";
import SectionPanel from "../ui/section-panel";

function toDisplayAttunement(item, labels) {
  if (item.requiresAttunement === true) {
    return item.attunementText || labels.required;
  }

  if (item.requiresAttunement === false) {
    return labels.notRequired;
  }

  return labels.unknown;
}

function buildItemHref({ locale, canonicalId, filters }) {
  const searchParams = new URLSearchParams();
  searchParams.set("item", canonicalId);

  if (filters.q) {
    searchParams.set("q", filters.q);
  }

  if (filters.rarity) {
    searchParams.set("rarity", filters.rarity);
  }

  if (filters.type) {
    searchParams.set("type", filters.type);
  }

  if (filters.attunement) {
    searchParams.set("attunement", filters.attunement);
  }

  return `/${locale}/magic-trading-post?${searchParams.toString()}`;
}

function buildRerollHref({ locale, filters, selectedItemId }) {
  const searchParams = new URLSearchParams();
  searchParams.set("roll", String(Date.now()));

  if (selectedItemId) {
    searchParams.set("item", selectedItemId);
  }

  if (filters.q) {
    searchParams.set("q", filters.q);
  }

  if (filters.rarity) {
    searchParams.set("rarity", filters.rarity);
  }

  if (filters.type) {
    searchParams.set("type", filters.type);
  }

  if (filters.attunement) {
    searchParams.set("attunement", filters.attunement);
  }

  return `/${locale}/magic-trading-post?${searchParams.toString()}`;
}

export default function MagicTradingPostDashboard({
  locale,
  items,
  selectedItem,
  filters,
  labels,
  randomStock,
}) {
  const rarityOptions = [...new Set(items.map((item) => item.rarity).filter(Boolean))].sort();
  const typeOptions = [...new Set(items.map((item) => item.type).filter(Boolean))].sort();

  return (
    <>
      <SectionPanel
        title={labels.filters.title}
        subtitle={labels.filters.subtitle}
        className="animate-in"
      >
        <form method="get" className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1 text-[0.95rem] text-[var(--text-main)]">
            <span>{labels.filters.search}</span>
            <input
              type="search"
              name="q"
              defaultValue={filters.q}
              placeholder={labels.filters.searchPlaceholder}
              className="rounded-[10px] border border-[var(--line)] bg-[rgb(14_10_7_/_90%)] px-3 py-2 text-[0.95rem] text-[var(--text-main)] outline-none transition focus:border-[var(--line-strong)]"
            />
          </label>

          <label className="grid gap-1 text-[0.95rem] text-[var(--text-main)]">
            <span>{labels.filters.rarity}</span>
            <select
              name="rarity"
              defaultValue={filters.rarity}
              className="rounded-[10px] border border-[var(--line)] bg-[rgb(14_10_7_/_90%)] px-3 py-2 text-[0.95rem] text-[var(--text-main)]"
            >
              <option value="">{labels.filters.anyRarity}</option>
              {rarityOptions.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-[0.95rem] text-[var(--text-main)]">
            <span>{labels.filters.type}</span>
            <select
              name="type"
              defaultValue={filters.type}
              className="rounded-[10px] border border-[var(--line)] bg-[rgb(14_10_7_/_90%)] px-3 py-2 text-[0.95rem] text-[var(--text-main)]"
            >
              <option value="">{labels.filters.anyType}</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-[0.95rem] text-[var(--text-main)]">
            <span>{labels.filters.attunement}</span>
            <select
              name="attunement"
              defaultValue={filters.attunement}
              className="rounded-[10px] border border-[var(--line)] bg-[rgb(14_10_7_/_90%)] px-3 py-2 text-[0.95rem] text-[var(--text-main)]"
            >
              <option value="">{labels.filters.anyAttunement}</option>
              <option value="required">{labels.filters.requiredAttunement}</option>
              <option value="not-required">{labels.filters.notRequiredAttunement}</option>
            </select>
          </label>

          <div className="md:col-span-2 xl:col-span-4 flex flex-wrap items-center gap-2">
            <button
              type="submit"
              className="cursor-pointer rounded-full border border-[var(--line-strong)] bg-[rgb(36_21_15_/_82%)] px-4 py-2 text-[0.74rem] tracking-[0.07em] text-[var(--accent-strong)] uppercase"
            >
              {labels.filters.apply}
            </button>
            <Link
              href={`/${locale}/magic-trading-post`}
              className="rounded-full border border-[var(--line)] bg-[rgb(35_24_18_/_78%)] px-[0.56rem] py-[0.2rem] text-[0.72rem] text-[var(--text-muted)] no-underline transition hover:text-[var(--accent-strong)]"
            >
              {labels.filters.reset}
            </Link>
          </div>
        </form>
      </SectionPanel>

      <SectionPanel
        title={labels.merchant.title}
        subtitle={labels.merchant.subtitle}
        className="animate-in"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] [background:linear-gradient(140deg,rgb(140_40_28_/_16%),transparent_42%),linear-gradient(180deg,rgb(24_17_12_/_95%),rgb(15_10_8_/_90%))] p-4">
          <div>
            <p className="m-0 text-[1rem] text-[var(--text-main)]">
              {randomStock?.merchant?.name || labels.meta.none}
            </p>
            <p className="m-0 mt-1 text-[0.92rem] text-[var(--text-muted)]">
              {randomStock?.merchant?.description || labels.merchant.empty}
            </p>
            <p className="m-0 mt-2 text-[0.78rem] uppercase tracking-[0.06em] text-[var(--accent)]">
              {randomStock?.merchant?.reputation === "shady"
                ? labels.merchant.reputation.shady
                : labels.merchant.reputation.trusted}
            </p>
          </div>
          <Link
            href={buildRerollHref({
              locale,
              filters,
              selectedItemId: selectedItem?.canonicalId || "",
            })}
            className="rounded-full border border-[var(--line-strong)] bg-[rgb(128_37_26_/_20%)] px-[0.58rem] py-[0.3rem] text-[0.74rem] tracking-[0.07em] text-[var(--accent-strong)] no-underline uppercase"
          >
            {labels.merchant.reroll}
          </Link>
        </div>

        {!randomStock?.items?.length ? (
          <p className="m-0 leading-[1.7] text-[var(--text-main)]">{labels.merchant.empty}</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {randomStock.items.map((entry) => (
              <article
                key={entry.item.canonicalId}
                className="rounded-[14px] border border-[var(--line)] [background:linear-gradient(140deg,rgb(133_42_26_/_14%),transparent_34%),linear-gradient(180deg,rgb(31_22_17_/_96%),rgb(17_12_9_/_93%))] p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h4 className="m-0 text-[1rem] text-[var(--text-main)]">{entry.item.name}</h4>
                  <Link
                    href={buildItemHref({
                      locale,
                      canonicalId: entry.item.canonicalId,
                      filters,
                    })}
                    className="rounded-full border border-[var(--line-strong)] bg-[rgb(128_37_26_/_20%)] px-[0.58rem] py-[0.2rem] text-[0.74rem] tracking-[0.07em] text-[var(--accent-strong)] no-underline uppercase"
                  >
                    {labels.list.view}
                  </Link>
                </div>
                <p className="m-0 text-[0.92rem] text-[var(--text-muted)]">
                  {entry.item.rarity || labels.meta.none}
                </p>
                <p className="m-0 mt-2 text-[0.92rem] text-[var(--text-main)]">
                  <strong>{labels.merchant.buyPrice}:</strong> {entry.buyPriceGp}{" "}
                  {labels.merchant.gp}
                </p>
                <p className="m-0 mt-1 text-[0.92rem] text-[var(--text-main)]">
                  <strong>{labels.merchant.rentPrice}:</strong> {entry.rentPriceGp}{" "}
                  {labels.merchant.gp}
                </p>
              </article>
            ))}
          </div>
        )}
      </SectionPanel>

      <SectionPanel
        title={labels.list.title}
        subtitle={labels.list.subtitle(items.length)}
        className="animate-in"
      >
        {items.length === 0 ? (
          <p className="m-0 leading-[1.7] text-[var(--text-main)]">{labels.list.empty}</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.canonicalId}
                className={`rounded-[14px] border [background:linear-gradient(140deg,rgb(123_35_23_/_14%),transparent_34%),linear-gradient(180deg,rgb(30_20_15_/_95%),rgb(16_11_8_/_93%))] p-4 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[2px] hover:border-[var(--line-strong)] hover:shadow-[0_14px_34px_rgb(0_0_0_/_34%)] ${selectedItem?.canonicalId === item.canonicalId ? "border-[var(--line-strong)]" : "border-[var(--line)]"}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h4 className="m-0 text-[1rem] text-[var(--text-main)]">{item.name}</h4>
                  <Link
                    href={buildItemHref({
                      locale,
                      canonicalId: item.canonicalId,
                      filters,
                    })}
                    className="rounded-full border border-[var(--line-strong)] bg-[rgb(128_37_26_/_20%)] px-[0.58rem] py-[0.2rem] text-[0.74rem] tracking-[0.07em] text-[var(--accent-strong)] no-underline uppercase"
                  >
                    {labels.list.view}
                  </Link>
                </div>
                <p className="m-0 text-[0.95rem] text-[var(--text-muted)]">{item.rarity || labels.meta.none}</p>
                <p className="m-0 mt-2 text-[0.95rem] leading-6 text-[var(--text-soft)]">
                  {item.description || labels.meta.noDescription}
                </p>
              </article>
            ))}
          </div>
        )}
      </SectionPanel>

      <SectionPanel
        title={labels.details.title}
        subtitle={selectedItem ? selectedItem.name : labels.details.none}
        className="animate-in"
      >
        {selectedItem ? (
          <article className="rounded-xl border border-[var(--line)] [background:linear-gradient(140deg,rgb(153_45_30_/_13%),transparent_34%),linear-gradient(180deg,rgb(23_16_12_/_92%),rgb(14_9_7_/_87%))] p-4">
            {selectedItem.imageUrl ? (
              <div
                className="mb-3 h-[180px] rounded-[12px] border border-[rgb(217_178_110_/_24%)] bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(8, 6, 4, 0.18) 0%, rgba(8, 6, 4, 0.62) 100%), url('${selectedItem.imageUrl}')`,
                }}
                data-testid="magic-item-image"
              />
            ) : null}
            <h4 className="m-0 text-[1.1rem] text-[var(--accent)]">{selectedItem.name}</h4>
            <p className="mt-2 mb-0 text-[0.95rem] text-[var(--text-soft)]">{selectedItem.voName}</p>
            <ul className="mt-3 grid gap-1 list-none p-0 text-[0.95rem] text-[var(--text-main)]">
              <li>
                <strong>{labels.meta.type}:</strong> {selectedItem.type || labels.meta.none}
              </li>
              <li>
                <strong>{labels.meta.rarity}:</strong> {selectedItem.rarity || labels.meta.none}
              </li>
              <li>
                <strong>{labels.meta.attunement}:</strong>{" "}
                {toDisplayAttunement(selectedItem, labels.attunement)}
              </li>
              <li>
                <strong>{labels.meta.source}:</strong>{" "}
                {selectedItem.sourceBook || labels.meta.none}
              </li>
            </ul>
            <p className="mt-3 mb-0 leading-[1.65] text-[var(--text-main)]">
              {selectedItem.description || labels.meta.noDescription}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedItem.itemUrl ? (
                <a
                  href={selectedItem.itemUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--line-strong)] bg-[rgb(128_37_26_/_20%)] px-[0.58rem] py-[0.2rem] text-[0.74rem] tracking-[0.07em] text-[var(--accent-strong)] no-underline uppercase"
                >
                  {labels.meta.openSource}
                </a>
              ) : null}
              {selectedItem.imageFallbackUsed ? (
                <span className="rounded-full border border-[var(--line)] bg-[rgb(35_24_18_/_78%)] px-[0.56rem] py-[0.2rem] text-[0.72rem] text-[var(--text-muted)]">
                  {labels.meta.imageFallback(selectedItem.imageLocaleUsed)}
                </span>
              ) : null}
              {selectedItem.itemUrlFallbackUsed ? (
                <span className="rounded-full border border-[var(--line)] bg-[rgb(35_24_18_/_78%)] px-[0.56rem] py-[0.2rem] text-[0.72rem] text-[var(--text-muted)]">
                  {labels.meta.linkFallback(selectedItem.itemUrlLocaleUsed)}
                </span>
              ) : null}
              {selectedItem.descriptionFallbackUsed ? (
                <span className="rounded-full border border-[var(--line)] bg-[rgb(35_24_18_/_78%)] px-[0.56rem] py-[0.2rem] text-[0.72rem] text-[var(--text-muted)]">
                  {labels.meta.descriptionFallback(selectedItem.descriptionLocaleUsed)}
                </span>
              ) : null}
            </div>
          </article>
        ) : (
          <p className="m-0 leading-[1.7] text-[var(--text-main)]">{labels.details.empty}</p>
        )}
      </SectionPanel>
    </>
  );
}
