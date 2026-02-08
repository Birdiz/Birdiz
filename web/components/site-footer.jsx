export default function SiteFooter({ githubUrl }) {
  return (
    <footer className="fixed right-0 bottom-0 left-0 border-t border-[var(--line)] bg-[rgba(12,10,8,0.95)] px-4 py-2 text-[var(--text-muted)] backdrop-blur-[4px] md:left-[280px] md:px-6">
      <p>
        Source code on{" "}
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] [text-underline-offset:0.2em] hover:text-[#dfb66f]"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
