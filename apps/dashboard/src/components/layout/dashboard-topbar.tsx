"use client";

import { SidebarTrigger } from "@dukkani/ui/components/sidebar";

/**
 * Mobile/tablet-only top bar (<1280px) that hosts the hamburger trigger for
 * the off-canvas sidebar drawer. Hidden at the desktop breakpoint, where the
 * sidebar is always visible and `SidebarTrigger` moves into the header.
 */
export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-border border-b bg-card px-4 xl:hidden">
      <SidebarTrigger />
      <span className="font-semibold text-sm">Dukkani</span>
    </header>
  );
}
