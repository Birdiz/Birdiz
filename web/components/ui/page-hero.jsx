export default function PageHero({ eyebrow, title, description, badges = [], art }) {
  return (
    <header className="hero-surface mb-5 rounded-[18px] p-5 md:p-7">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          {eyebrow ? <p className="hero-eyebrow mb-2">{eyebrow}</p> : null}
          <h2 className="hero-title m-0">{title}</h2>
          <p className="hero-description mt-3 mb-0 max-w-[72ch]">{description}</p>
          {badges.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2 p-0">
              {badges.map((badge) => (
                <li key={badge} className="tag-chip list-none">
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="hero-art h-[140px] overflow-hidden rounded-[14px] p-4 md:h-[170px]">
          <p className="m-0 text-sm leading-6 text-[var(--text-muted)]">{art}</p>
        </div>
      </div>
    </header>
  );
}
