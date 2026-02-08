"use client";

import { useState } from "react";
import SiteFooter from "./site-footer";
import SidebarMenu from "./sidebar-menu";

export default function HomeShell({ content, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((current) => !current);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]">
      <button
        type="button"
        className="fixed top-4 left-4 z-35 inline-block cursor-pointer rounded-full border border-[var(--line)] bg-[rgba(18,16,13,0.95)] px-3 py-1.5 tracking-[0.04em] text-[var(--text-main)] md:hidden"
        style={{ fontFamily: "var(--font-heading)" }}
        aria-controls="site-sidebar"
        aria-expanded={isSidebarOpen}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      <div
        className={`fixed inset-0 z-15 bg-[rgba(5,4,3,0.5)] transition-opacity duration-200 md:hidden ${isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
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

      <main className="px-4 pt-17 pb-22 md:px-8 md:pt-8 md:pb-21">
        <article className="w-full">{children}</article>
        <SiteFooter githubUrl={content.githubUrl} />
      </main>
    </div>
  );
}
