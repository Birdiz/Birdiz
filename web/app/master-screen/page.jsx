import HomeShell from "../../components/home-shell";
import { homeContent } from "../../lib/homeContent";
import { getMasterScreenDamages } from "../../lib/masterScreenData";

export default async function MasterScreenPage() {
  const damages = await getMasterScreenDamages();

  return (
    <HomeShell content={homeContent}>
      <section className="mb-4 rounded-[14px] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(199,154,74,0.06),transparent_30%),rgba(27,23,18,0.7)] px-5 py-5 last:mb-0">
        <h2
          className="mb-3 flex items-center gap-2 text-[1.3rem] tracking-[0.02em] text-[var(--accent)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-[0.95rem] text-[var(--accent-soft)]">✧</span>
          Master Screen
        </h2>

        {damages.length === 0 ? (
          <p className="m-0 leading-[1.7] text-[var(--text-main)]">No damages found yet.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
            {damages.map((damage) => (
              <article
                key={damage.die}
                className="rounded-xl border border-[var(--line)] bg-[rgba(15,13,11,0.48)] px-4 py-3"
              >
                <h3
                  className="mb-2 text-[1.05rem] text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {damage.die}
                </h3>
                <ul className="m-0 list-none p-0 leading-[1.7] text-[var(--text-main)]">
                  {damage.examples.map((example) => (
                    <li key={example} className="relative pl-6 before:absolute before:top-0 before:left-0 before:text-[0.78rem] before:text-[var(--accent-soft)] before:content-['⚔']">
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </HomeShell>
  );
}
