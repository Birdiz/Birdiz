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
      className={`fixed top-0 left-0 z-20 min-h-screen w-[min(80vw,320px)] border-r border-[var(--line)] bg-[linear-gradient(180deg,rgba(21,16,12,0.97),rgba(10,7,5,0.97))] p-5 transition-transform duration-200 md:sticky md:w-auto md:min-w-[300px] md:translate-x-0 md:self-start md:p-8 ${isOpen ? "translate-x-0" : "-translate-x-[105%]"}`}
      aria-label="Sidebar navigation"
    >
      <div className="rounded-[14px] border border-[var(--line)] bg-[rgba(24,19,14,0.75)] p-4">
        <h1 className="m-0 flex items-center gap-2 text-[1.85rem] tracking-[0.03em] text-[var(--accent)]">
          <MedievalCrest className="h-7 w-7 shrink-0 text-[var(--accent)] opacity-90" />
          <span>{projectName}</span>
        </h1>
        <p className="mt-2 mb-0 text-[0.95rem] text-[var(--text-muted)]">{subtitle}</p>
      </div>

      <nav aria-label="Pages" className="mt-6">
        <ul className="m-0 grid list-none gap-2 p-0">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                className="group flex items-center justify-between rounded-[10px] border border-transparent px-3 py-2 text-[var(--text-main)] no-underline transition hover:border-[var(--line)] hover:bg-[rgba(34,27,20,0.7)]"
                href={item.href}
                onClick={onClose}
              >
                <span>{item.label}</span>
                <span className="text-[var(--accent-deep)] transition group-hover:text-[var(--accent)]">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
