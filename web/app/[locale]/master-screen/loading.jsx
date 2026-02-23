export default function LocalizedMasterScreenLoading() {
  return (
    <div className="relative isolate grid min-h-screen grid-cols-1 md:grid-cols-[300px_1fr]">
      <aside
        className="hidden border-r border-[var(--line)] [background:linear-gradient(180deg,rgb(33_20_15_/_96%),rgb(10_6_4_/_96%)),url('/ambiance/parchment-grid.svg')] bg-cover p-4 shadow-[inset_-1px_0_0_rgb(238_205_145_/_8%)] md:block"
        aria-hidden="true"
      >
        <div className="mb-4 rounded-[14px] border border-[var(--line)] [background:linear-gradient(180deg,rgb(45_30_21_/_92%),rgb(28_18_13_/_92%)),linear-gradient(90deg,rgb(155_43_27_/_24%),transparent_40%)] p-4 shadow-[var(--shadow-soft)]">
          <div className="skeleton-shimmer skeleton-line-lg mb-2 w-2/3" />
          <div className="skeleton-shimmer skeleton-line w-4/5" />
        </div>
        <div className="grid gap-2">
          <div className="skeleton-shimmer h-10 rounded-[12px]" />
          <div className="skeleton-shimmer h-10 rounded-[12px]" />
          <div className="skeleton-shimmer h-10 rounded-[12px]" />
        </div>
      </aside>

      <main className="relative px-4 pt-17 pb-24 md:px-8 md:pt-8 md:pb-21">
        <article
          className="mx-auto w-full max-w-[1240px] [animation:reveal-rise_300ms_ease]"
          aria-busy="true"
          aria-live="polite"
          data-testid="master-screen-loading"
        >
          <header className="relative mb-5 overflow-hidden rounded-[18px] border border-[rgb(217_178_110_/_20%)] [background:linear-gradient(135deg,rgb(176_56_38_/_20%),transparent_36%),linear-gradient(180deg,rgb(38_24_18_/_96%),rgb(20_13_10_/_95%))] p-5 shadow-[var(--shadow-panel)] before:absolute before:top-0 before:right-0 before:left-0 before:h-[3px] before:content-[''] before:[background:linear-gradient(90deg,transparent_0%,rgb(245_217_166_/_84%)_16%,rgb(166_59_42_/_82%)_60%,transparent_100%)] md:p-7">
            <div className="skeleton-shimmer mb-5 h-[168px] w-full rounded-[14px] md:h-[220px]" />
            <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <div className="skeleton-shimmer skeleton-line mb-2 w-1/4" />
                <div className="skeleton-shimmer skeleton-line-lg mb-3 w-4/5" />
                <div className="skeleton-shimmer skeleton-line mb-2 w-full" />
                <div className="skeleton-shimmer skeleton-line w-11/12" />
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="skeleton-shimmer h-7 w-26 rounded-full" />
                  <span className="skeleton-shimmer h-7 w-22 rounded-full" />
                  <span className="skeleton-shimmer h-7 w-28 rounded-full" />
                </div>
              </div>
              <div className="skeleton-shimmer h-[140px] rounded-[14px] p-4 md:h-[170px]" />
            </div>
          </header>

          <section className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((index) => (
              <article
                key={index}
                className="rounded-[14px] border border-[var(--line)] [background:linear-gradient(140deg,rgb(123_35_23_/_14%),transparent_34%),linear-gradient(180deg,rgb(30_20_15_/_95%),rgb(16_11_8_/_93%))] p-4"
                data-testid="skeleton-nav-card"
                aria-hidden="true"
              >
                <div className="skeleton-shimmer mb-2 h-9 w-9 rounded-full" />
                <div className="skeleton-shimmer skeleton-line-lg mb-2 w-2/3" />
                <div className="skeleton-shimmer skeleton-line w-full" />
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="skeleton-shimmer h-6 w-20 rounded-full" />
                  <span className="skeleton-shimmer h-6 w-24 rounded-full" />
                </div>
              </article>
            ))}
          </section>

          <section className="mb-4 rounded-[16px] border border-[rgb(217_178_110_/_18%)] [background:linear-gradient(130deg,rgb(153_49_33_/_14%),transparent_32%),linear-gradient(180deg,rgb(34_22_16_/_94%),rgb(21_14_10_/_92%))] p-4 shadow-[var(--shadow-soft)] md:p-5">
            <div className="mb-3 border-b border-[rgb(217_178_110_/_14%)] pb-[0.7rem]">
              <div className="skeleton-shimmer skeleton-line-lg mb-2 w-1/3" />
              <div className="skeleton-shimmer skeleton-line w-2/5" />
            </div>
            <div className="grid gap-3">
              <div className="skeleton-panel">
                <div className="skeleton-shimmer skeleton-line-lg mb-3 w-1/4" />
                <div className="grid gap-2">
                  <div className="skeleton-shimmer skeleton-line w-full" />
                  <div className="skeleton-shimmer skeleton-line w-full" />
                  <div className="skeleton-shimmer skeleton-line w-4/5" />
                </div>
              </div>
              <div className="skeleton-panel">
                <div className="skeleton-shimmer skeleton-line-lg mb-3 w-1/5" />
                <div className="grid gap-2">
                  <div className="skeleton-shimmer skeleton-line w-full" />
                  <div className="skeleton-shimmer skeleton-line w-11/12" />
                  <div className="skeleton-shimmer skeleton-line w-5/6" />
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
