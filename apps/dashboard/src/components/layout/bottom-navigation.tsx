"use client";

import { cn } from "@dukkani/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveRoute, mainNavLinks } from "@/components/layout/nav-links";
import { shouldHideBottomNav } from "@/shared/config/routes";

export function BottomNavigation() {
  const pathname = usePathname();

  if (shouldHideBottomNav(pathname)) {
    return null;
  }

  return (
    <nav className="fixed right-0 bottom-0 left-0 flex items-center justify-around border-border border-t bg-card px-4 py-3 xl:hidden">
      {mainNavLinks.map((item) => {
        const Icon = item.icon;
        const isActive = isActiveRoute(pathname, item.url, item.url === "/");
        return (
          <Link
            key={item.url}
            href={item.url}
            aria-label={item.label}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors",
              {
                "bg-accent/20 text-primary": isActive,
                "text-muted-foreground hover:text-foreground": !isActive,
              },
            )}
          >
            {Icon && <Icon className="h-5 w-5" />}
            <span className="hidden font-medium text-xs sm:inline">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
