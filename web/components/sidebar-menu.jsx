import MedievalCrest from "./medieval-crest";

export default function SidebarMenu({
  projectName,
  subtitle,
  items,
  classes,
  sidebarId,
  isOpen,
  onClose,
}) {
  return (
    <aside
      id={sidebarId}
      className={`${classes.sidebar} ${isOpen ? classes.sidebarOpen : ""}`}
      aria-label="Sidebar navigation"
    >
      <h1 className={classes.sidebarTitle}>
        <MedievalCrest className={classes.crest} />
        <span>{projectName}</span>
      </h1>
      <p className={classes.sidebarSubtitle}>{subtitle}</p>

      <nav aria-label="Page sections">
        <ul className={classes.sidebarList}>
          {items.map((item) => (
            <li key={item.href}>
              <a
                className={classes.sidebarLink}
                href={item.href}
                onClick={onClose}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
