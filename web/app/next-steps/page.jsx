import HomeShell from "../../components/home-shell";
import { homeContent } from "../../lib/homeContent";

export default function NextStepsPage() {
  return (
    <HomeShell content={homeContent}>
      <section className="mb-4 rounded-[14px] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(199,154,74,0.06),transparent_30%),rgba(27,23,18,0.7)] px-5 py-5 last:mb-0">
        <h2
          className="mb-3 flex items-center gap-2 text-[1.3rem] tracking-[0.02em] text-[var(--accent)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-[0.95rem] text-[var(--accent-soft)]">✧</span>
          Next Steps
        </h2>
        <p className="m-0 leading-[1.7] text-[var(--text-main)]">
          {homeContent.nextSteps}
        </p>
      </section>
    </HomeShell>
  );
}
