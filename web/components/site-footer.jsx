"use client";

import { useIntl } from "react-intl";

export default function SiteFooter({ githubUrl }) {
  const intl = useIntl();

  return (
    <footer className="fixed right-0 bottom-0 left-0 border-t border-[var(--line)] [background:linear-gradient(180deg,rgb(17_10_8_/_94%),rgb(8_5_4_/_98%)),linear-gradient(90deg,rgb(150_52_35_/_18%),transparent_40%)] px-4 py-2 text-[var(--text-muted)] shadow-[0_-7px_24px_rgb(0_0_0_/_34%)] backdrop-blur-[5px] md:left-[300px] md:px-6">
      <div className="flex w-full items-center justify-between gap-3 text-[0.95rem]">
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
