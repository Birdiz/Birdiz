export default function SectionPanel({ title, subtitle, children, className = "" }) {
  return (
    <section className={`section-panel shell-panel mb-4 rounded-[16px] p-4 md:p-5 ${className}`.trim()}>
      <div className="section-panel-heading mb-3 flex items-center justify-between gap-3">
        <h3 className="panel-title m-0">{title}</h3>
        {subtitle ? <p className="panel-subtitle m-0">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
