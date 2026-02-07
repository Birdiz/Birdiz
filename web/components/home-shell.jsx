"use client";

import { useState } from "react";
import SiteFooter from "./site-footer";
import SidebarMenu from "./sidebar-menu";
import styles from "../app/page.module.css";

export default function HomeShell({ content }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const damages = content.masterScreenDamages || [];

  const toggleSidebar = () => setIsSidebarOpen((current) => !current);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.layout}>
      <button
        type="button"
        className={styles.mobileToggle}
        aria-controls="site-sidebar"
        aria-expanded={isSidebarOpen}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      <div
        className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.sidebarOverlayOpen : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <SidebarMenu
        projectName={content.projectName}
        subtitle={content.subtitle}
        items={content.menuItems}
        classes={styles}
        sidebarId="site-sidebar"
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <main className={styles.main}>
        <article className={styles.sections}>
          <section id="project" className={styles.section}>
            <h2 className={styles.sectionTitle}>Project</h2>
            <p className={styles.copy}>{content.description}</p>
          </section>

          <section id="intentions" className={styles.section}>
            <h2 className={styles.sectionTitle}>Intentions</h2>
            <ul className={styles.list}>
              {content.intentions.map((intention) => (
                <li key={intention}>{intention}</li>
              ))}
            </ul>
          </section>

          <section id="master-screen" className={styles.section}>
            <h2 className={styles.sectionTitle}>Master Screen</h2>
            {damages.length === 0 ? (
              <p className={styles.copy}>No damages found yet.</p>
            ) : (
              <div className={styles.damageGrid}>
                {damages.map((damage) => (
                  <article key={damage.die} className={styles.damageCard}>
                    <h3 className={styles.damageDie}>{damage.die}</h3>
                    <ul className={styles.list}>
                      {damage.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section id="next-steps" className={styles.section}>
            <h2 className={styles.sectionTitle}>Next Steps</h2>
            <p className={styles.copy}>
              This first revamp focuses on structure and visual direction.
              Additional pages and game tools will be added incrementally.
            </p>
          </section>

          <SiteFooter
            className={styles.siteFooter}
            githubUrl={content.githubUrl}
          />
        </article>
      </main>
    </div>
  );
}
