import Link from "next/link";
import MedievalCrest from "./medieval-crest";

export default function SidebarMenu({
  projectName,
  subtitle,
  items,
  sidebarId,
  isOpen,
  onClose,
}) {
  return (
    <aside
      id={sidebarId}
      className={`fixed top-0 left-0 z-20 min-h-screen w-[min(78vw,300px)] border-r border-[var(--line)] bg-gradient-to-b from-[rgba(24,20,16,0.95)] to-[rgba(16,13,10,0.95)] p-5 transition-transform duration-200 md:sticky md:w-auto md:min-w-[280px] md:translate-x-0 md:self-start md:p-9 ${isOpen ? "translate-x-0" : "-translate-x-[105%]"}`}
      aria-label="Sidebar navigation"
    >
      <h1 className="m-0 flex items-center gap-2 text-[2rem] tracking-[0.03em] text-[var(--accent)]" style={{ fontFamily: "var(--font-heading)" }}>
        <MedievalCrest className="h-7 w-7 shrink-0 text-[var(--accent)] opacity-85" />
        <span>{projectName}</span>
      </h1>
      <p className="mt-2 mb-7 text-[var(--text-muted)]">{subtitle}</p>

      <nav aria-label="Pages">
        <ul className="m-0 grid list-none gap-2 p-0">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                className="inline-block border-b border-transparent py-1 text-[var(--text-main)] no-underline hover:border-[var(--accent-soft)] hover:text-[var(--accent)]"
                href={item.href}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
