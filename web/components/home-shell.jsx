"use client";

import { useState } from "react";
import SiteFooter from "./site-footer";
import SidebarMenu from "./sidebar-menu";

export default function HomeShell({ content, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((current) => !current);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[300px_1fr]">
      <button
        type="button"
        className="fixed top-4 left-4 z-35 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[rgba(14,10,7,0.95)] px-3 py-1.5 text-sm tracking-[0.08em] text-[var(--text-main)] uppercase md:hidden"
        aria-controls="site-sidebar"
        aria-expanded={isSidebarOpen}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        onClick={toggleSidebar}
      >
        <span className="text-[var(--accent-strong)]">◆</span>
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      <div
        className={`fixed inset-0 z-15 bg-[rgba(4,3,2,0.68)] backdrop-blur-[2px] transition-opacity duration-200 md:hidden ${isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <SidebarMenu
        projectName={content.projectName}
        subtitle={content.subtitle}
        items={content.menuItems}
        sidebarId="site-sidebar"
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <main className="relative px-4 pt-17 pb-24 md:px-8 md:pt-8 md:pb-21">
        <article className="mx-auto w-full max-w-[1160px]">{children}</article>
        <SiteFooter githubUrl={content.githubUrl} />
      </main>
    </div>
  );
}
