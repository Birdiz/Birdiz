export default function SectionPanel({ title, subtitle, children, className = "" }) {
  return (
    <section
      className={`mb-4 rounded-[16px] border border-[rgb(217_178_110_/_18%)] [background:linear-gradient(130deg,rgb(153_49_33_/_14%),transparent_32%),linear-gradient(180deg,rgb(34_22_16_/_94%),rgb(21_14_10_/_92%))] p-4 shadow-[var(--shadow-soft)] md:p-5 ${className}`.trim()}
    >
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-[rgb(217_178_110_/_14%)] pb-[0.7rem]">
        <h3 className="m-0 text-[1.12rem] text-[var(--accent-strong)]">{title}</h3>
        {subtitle ? <p className="m-0 text-[0.85rem] text-[var(--text-muted)]">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
