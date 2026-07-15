"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dukkani/ui/components/dropdown-menu";
import { Icons } from "@dukkani/ui/components/icons";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@dukkani/ui/components/sidebar";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";

/**
 * "Create" action in the sidebar footer — a dropdown of the two create
 * flows that already exist in the app (`RoutePaths.PRODUCTS.NEW` and
 * `RoutePaths.CUSTOMERS.NEW`). Orders have no manual-creation route, so
 * they're intentionally left out rather than inventing one.
 */
export function NavCreateAction() {
  const { isMobile } = useSidebar();
  const t = useTranslations("dashboard.sidebar");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={t("create")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <Icons.plus />
              <span>{t("create")}</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem asChild>
              <Link href={RoutePaths.PRODUCTS.NEW.url}>
                <RoutePaths.PRODUCTS.INDEX.icon />
                {RoutePaths.PRODUCTS.NEW.label}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={RoutePaths.CUSTOMERS.NEW.url}>
                <RoutePaths.CUSTOMERS.INDEX.icon />
                {RoutePaths.CUSTOMERS.NEW.label}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
