export default function SiteFooter({ githubUrl }) {
  return (
    <footer className="fixed right-0 bottom-0 left-0 border-t border-[var(--line)] bg-[rgba(10,7,5,0.95)] px-4 py-2 text-[var(--text-muted)] backdrop-blur-[5px] md:left-[300px] md:px-6">
      <div className="mx-auto flex w-full max-w-[1160px] items-center justify-between gap-3 text-sm">
        <p className="m-0">Built for practical D20 session flow.</p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] [text-underline-offset:0.2em] hover:text-[var(--accent-strong)]"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
