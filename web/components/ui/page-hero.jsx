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
    <header className="hero-surface hero-frame mb-5 rounded-[18px] p-5 md:p-7">
      {hasBackgroundImage ? (
        <div
          className="hero-atmosphere mb-5 h-[168px] w-full rounded-[14px] md:h-[220px]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(8, 6, 4, 0.2) 0%, rgba(8, 6, 4, 0.75) 100%), url('${backgroundImage}')`,
          }}
          data-testid="hero-atmosphere"
        />
      ) : null}
      <div className={`grid gap-5 ${hasArt ? "lg:grid-cols-[1.5fr_1fr] lg:items-end" : ""}`}>
        <div>
          {eyebrow ? <p className="hero-eyebrow mb-2">{eyebrow}</p> : null}
          <h2 className="hero-title m-0">{title}</h2>
          <p className="hero-description mt-3 mb-0 max-w-[72ch]">{description}</p>
          {badges.length > 0 ? (
            <ul className="hero-badges mt-4 flex flex-wrap gap-2 p-0">
              {badges.map((badge) => (
                <li key={badge} className="tag-chip list-none">
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {hasArt ? (
          <div className="hero-art h-[140px] overflow-hidden rounded-[14px] p-4 md:h-[170px]">
            <p className="m-0 text-sm leading-6 text-[var(--text-muted)]">{art}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
