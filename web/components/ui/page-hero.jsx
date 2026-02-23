export default function PageHero({
  eyebrow,
  title,
  description,
  badges = [],
  art = null,
  backgroundImage = null,
}) {
  const hasArt = Boolean(art);
  const hasBackgroundImage = Boolean(backgroundImage);

  return (
    <header className="relative mb-5 overflow-hidden rounded-[18px] border border-[rgb(217_178_110_/_20%)] [background:linear-gradient(135deg,rgb(176_56_38_/_20%),transparent_36%),linear-gradient(180deg,rgb(38_24_18_/_96%),rgb(20_13_10_/_95%))] p-5 shadow-[var(--shadow-panel)] before:absolute before:top-0 before:right-0 before:left-0 before:h-[3px] before:content-[''] before:[background:linear-gradient(90deg,transparent_0%,rgb(245_217_166_/_84%)_16%,rgb(166_59_42_/_82%)_60%,transparent_100%)] md:p-7">
      {hasBackgroundImage ? (
        <div
          className="mb-5 h-[168px] w-full rounded-[14px] border border-[rgb(217_178_110_/_20%)] bg-cover bg-center shadow-[inset_0_-44px_74px_rgb(0_0_0_/_56%),0_10px_26px_rgb(0_0_0_/_24%)] md:h-[220px]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(8, 6, 4, 0.2) 0%, rgba(8, 6, 4, 0.75) 100%), url('${backgroundImage}')`,
          }}
          data-testid="hero-atmosphere"
        />
      ) : null}
      <div className={`grid gap-5 ${hasArt ? "lg:grid-cols-[1.5fr_1fr] lg:items-end" : ""}`}>
        <div>
          {eyebrow ? (
            <p className="mb-2 text-[0.72rem] tracking-[0.14em] text-[var(--accent-strong)] uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="m-0 text-[clamp(1.5rem,2.4vw,2.08rem)] leading-[1.2] text-[var(--text-main)]">
            {title}
          </h2>
          <p className="mt-3 mb-0 max-w-[72ch] leading-[1.72] text-[var(--text-soft)]">
            {description}
          </p>
          {badges.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2 p-0">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="list-none rounded-full border border-[var(--line-strong)] bg-[linear-gradient(180deg,rgb(128_37_26_/_36%),rgb(108_34_24_/_24%))] px-[0.58rem] py-[0.2rem] text-[0.74rem] tracking-[0.07em] text-[var(--accent-strong)] uppercase"
                >
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {hasArt ? (
          <div className="h-[140px] overflow-hidden rounded-[14px] border border-[rgb(217_178_110_/_20%)] [background:linear-gradient(145deg,rgb(161_55_38_/_20%),transparent_42%),linear-gradient(180deg,rgb(23_15_11_/_88%),rgb(14_9_7_/_92%))] p-4 md:h-[170px]">
            <p className="m-0 text-[0.95rem] leading-6 text-[var(--text-muted)]">{art}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
