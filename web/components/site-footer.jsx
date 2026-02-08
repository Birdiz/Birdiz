"use client";

import { useIntl } from "react-intl";

export default function SiteFooter({ githubUrl }) {
  const intl = useIntl();

  return (
    <footer className="fixed right-0 bottom-0 left-0 border-t border-[var(--line)] bg-[rgba(10,7,5,0.95)] px-4 py-2 text-[var(--text-muted)] backdrop-blur-[5px] md:left-[300px] md:px-6">
      <div className="flex w-full items-center justify-between gap-3 text-sm">
        <p className="m-0">{intl.formatMessage({ id: "footer.tagline" })}</p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] [text-underline-offset:0.2em] hover:text-[var(--accent-strong)]"
        >
          {intl.formatMessage({ id: "footer.github" })}
        </a>
      </div>
    </footer>
  );
}
