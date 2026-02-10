export default function LocalizedMasterScreenLoading() {
  return (
    <div className="site-shell grid min-h-screen grid-cols-1 md:grid-cols-[300px_1fr]">
      <aside className="sidebar-shell hidden p-4 md:block" aria-hidden="true">
        <div className="sidebar-brand mb-4 rounded-[14px] p-4">
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
          className="content-column w-full"
          aria-busy="true"
          aria-live="polite"
          data-testid="master-screen-loading"
        >
          <header className="hero-surface hero-frame mb-5 rounded-[18px] p-5 md:p-7">
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
                className="tool-card rounded-[14px] p-4"
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

          <section className="section-panel shell-panel mb-4 rounded-[16px] p-4 md:p-5">
            <div className="section-panel-heading mb-3">
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
