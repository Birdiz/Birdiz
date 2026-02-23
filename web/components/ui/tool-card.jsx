import Link from "next/link";

export default function ToolCard({
  title,
  description,
  href,
  meta = [],
  ctaLabel,
  featureImage = null,
}) {
  const hasFeatureImage = Boolean(featureImage);

  return (
    <article className="rounded-[14px] border border-[var(--line)] [background:linear-gradient(140deg,rgb(123_35_23_/_14%),transparent_34%),linear-gradient(180deg,rgb(30_20_15_/_95%),rgb(16_11_8_/_93%))] p-4 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[2px] hover:border-[var(--line-strong)] hover:shadow-[0_14px_34px_rgb(0_0_0_/_34%)]">
      <div
        className="mb-3 h-[3px] rounded-full bg-[linear-gradient(90deg,rgb(169_52_36_/_85%),rgb(243_217_170_/_66%))]"
        aria-hidden="true"
      />
      {hasFeatureImage ? (
        <div
          className="mb-3 h-[120px] rounded-[10px] border border-[rgb(217_178_110_/_24%)] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(8, 6, 4, 0.15) 0%, rgba(8, 6, 4, 0.64) 100%), url('${featureImage}')`,
          }}
          data-testid="tool-card-art"
        />
      ) : null}
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="m-0 text-[1.05rem] text-[var(--text-main)]">{title}</h4>
        <Link
          href={href}
          className="rounded-full border border-[var(--line-strong)] bg-[rgb(128_37_26_/_20%)] px-[0.58rem] py-[0.2rem] text-[0.74rem] tracking-[0.07em] text-[var(--accent-strong)] no-underline uppercase transition hover:text-[var(--accent-strong)]"
        >
          {ctaLabel}
        </Link>
      </div>
      <p className="m-0 text-[0.95rem] leading-6 text-[var(--text-muted)]">{description}</p>
      {meta.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2 p-0">
          {meta.map((item) => (
            <li
              key={item}
              className="list-none rounded-full border border-[var(--line)] bg-[rgb(35_24_18_/_78%)] px-[0.56rem] py-[0.2rem] text-[0.72rem] text-[var(--text-muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
