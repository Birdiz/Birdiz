export default function MedievalCrest({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 4 10 12v18c0 13 9.5 24.7 22 30 12.5-5.3 22-17 22-30V12L32 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path d="M32 14v36M14 24h36" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="m22 42 10-10 10 10" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
