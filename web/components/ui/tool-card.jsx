import Link from "next/link";

export default function ToolCard({
  title,
  description,
  href,
  status,
  meta = [],
  ctaLabel,
  featureImage = null,
}) {
  const hasFeatureImage = Boolean(featureImage);

  return (
    <article className="tool-card rounded-[14px] border border-[var(--line)] p-4">
      <div className="tool-card-ribbon mb-3" aria-hidden="true" />
      {hasFeatureImage ? (
        <div
          className="tool-card-art mb-3 h-[120px] rounded-[10px]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(8, 6, 4, 0.15) 0%, rgba(8, 6, 4, 0.64) 100%), url('${featureImage}')`,
          }}
          data-testid="tool-card-art"
        />
      ) : null}
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="m-0 text-[1.05rem] text-[var(--text-main)]">{title}</h4>
        <span className="tag-chip">{status}</span>
      </div>
      <p className="m-0 text-sm leading-6 text-[var(--text-muted)]">{description}</p>
      {meta.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2 p-0">
          {meta.map((item) => (
            <li key={item} className="info-pill list-none">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href={href}
        className="mt-4 inline-flex text-sm text-[var(--accent)] no-underline transition hover:text-[var(--accent-strong)]"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
