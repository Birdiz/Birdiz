"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIntl } from "react-intl";
import { SUPPORTED_LOCALES } from "../lib/i18n/locales";
import { getLocalePath } from "../lib/i18n/routing";
import MedievalCrest from "./medieval-crest";

export default function SidebarMenu({
  locale,
  projectName,
  subtitle,
  items,
  sidebarId,
  isOpen,
  onClose,
}) {
  const intl = useIntl();
  const pathname = usePathname() ?? "/";

  return (
    <aside
      id={sidebarId}
      className={`fixed top-0 left-0 z-20 min-h-screen w-[min(80vw,320px)] border-r border-[var(--line)] bg-[linear-gradient(180deg,rgba(21,16,12,0.97),rgba(10,7,5,0.97))] p-5 transition-transform duration-200 md:sticky md:w-auto md:min-w-[300px] md:translate-x-0 md:self-start md:p-8 ${isOpen ? "translate-x-0" : "-translate-x-[105%]"}`}
      aria-label={intl.formatMessage({ id: "nav.pages" })}
    >
      <div className="rounded-[14px] border border-[var(--line)] bg-[rgba(24,19,14,0.75)] p-4">
        <h1 className="m-0 flex items-center gap-2 text-[1.85rem] tracking-[0.03em] text-[var(--accent)]">
          <MedievalCrest className="h-7 w-7 shrink-0 text-[var(--accent)] opacity-90" />
          <span>{projectName}</span>
        </h1>
        <p className="mt-2 mb-0 text-[0.95rem] text-[var(--text-muted)]">{subtitle}</p>
      </div>

      <nav aria-label={intl.formatMessage({ id: "nav.pages" })} className="mt-6">
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

      <div className="mt-6 border-t border-[var(--line)] pt-4">
        <p className="m-0 mb-2 text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase">
          {intl.formatMessage({ id: "nav.language" })}
        </p>
        <div className="flex gap-2">
          {SUPPORTED_LOCALES.map((targetLocale) => {
            const isActive = targetLocale === locale;
            return (
              <Link
                key={targetLocale}
                href={getLocalePath(pathname, targetLocale)}
                onClick={onClose}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.08em] no-underline transition ${isActive ? "border-[var(--line-strong)] text-[var(--accent-strong)]" : "border-[var(--line)] text-[var(--text-muted)] hover:border-[var(--line-strong)] hover:text-[var(--text-main)]"}`}
              >
                {targetLocale}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
