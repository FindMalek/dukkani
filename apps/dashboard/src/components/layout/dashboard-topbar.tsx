"use client";

import { SidebarTrigger } from "@dukkani/ui/components/sidebar";
import { cn } from "@dukkani/ui/lib/utils";
import { layoutConstants } from "@/shared/config/constants";

/**
 * Mobile/tablet-only top bar (<1280px) that hosts the hamburger trigger for
 * the off-canvas sidebar drawer. Hidden at the desktop breakpoint, where the
 * sidebar is always visible and `SidebarTrigger` moves into the header.
 */
export function DashboardTopbar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex shrink-0 items-center gap-2 border-border border-b bg-card px-4 xl:hidden",
        layoutConstants.TOPBAR_HEIGHT_CLASS,
      )}
    >
      <SidebarTrigger />
      <span className="font-semibold text-sm">Dukkani</span>
    </header>
  );
}
