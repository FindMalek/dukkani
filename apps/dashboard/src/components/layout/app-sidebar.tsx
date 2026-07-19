"use client";

import { Icons } from "@dukkani/ui/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@dukkani/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavCreateAction } from "@/components/layout/nav-create-action";
import { isActiveRoute, mainNavLinks } from "@/components/layout/nav-links";
import { NavUser } from "@/components/layout/nav-user";
import { RoutePaths } from "@/shared/config/routes";

/**
 * Persistent desktop rail (>=1280px, `collapsible="icon"`) / off-canvas
 * mobile drawer (<1280px) — see `packages/ui/src/components/sidebar.tsx`
 * for the breakpoint. Primary nav mirrors `BottomNavigation` exactly (same
 * `RoutePaths`, icons, labels) via the shared `mainNavLinks` list.
 */
export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={RoutePaths.DASHBOARD.url}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icons.logo className="size-4" />
                </div>
                <span className="truncate font-semibold">Dukkani</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(
                pathname,
                item.url,
                item.url === "/",
              );

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <Link href={item.url}>
                      {Icon && <Icon />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavCreateAction />
        <SidebarSeparator className="mx-0" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
