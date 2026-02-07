export default function SiteFooter({ githubUrl, className }) {
  return (
    <footer className={className}>
      <p>
        Source code on{" "}
        <a href={githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  );
}
