"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@dukkani/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dukkani/ui/components/dropdown-menu";
import { Icons } from "@dukkani/ui/components/icons";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@dukkani/ui/components/sidebar";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LogoutButton } from "@/components/app/settings/logout-button";
import { appQueries } from "@/shared/api/queries";
import { RoutePaths } from "@/shared/config/routes";
import { useActiveStoreStore } from "@/shared/lib/store/active.store";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/**
 * Sidebar footer account menu: avatar, user name, active store name,
 * settings link, and logout — mirrors the account info previously only
 * available from `UserMenu` (unused) / the settings page's `LogoutButton`.
 */
export function NavUser() {
  const { isMobile } = useSidebar();
  const t = useTranslations("settings.logout");
  const { selectedStoreId } = useActiveStoreStore();
  const { data: user, isPending: isUserPending } = useQuery(
    appQueries.account.currentUser(),
  );
  const { data: stores } = useQuery(appQueries.store.all());

  const activeStore = stores?.find((store) => store.id === selectedStoreId);

  if (isUserPending || !user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="size-8 shrink-0 rounded-lg" />
            <div className="flex min-w-0 flex-1 flex-col gap-1 group-data-[collapsible=icon]:hidden">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-muted-foreground text-xs">
                  {activeStore?.name ?? user.email}
                </span>
              </div>
              <Icons.chevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-muted-foreground text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={RoutePaths.SETTINGS.INDEX.url}>
                  <Icons.settings />
                  {RoutePaths.SETTINGS.INDEX.label}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              asChild
              onSelect={(event) => event.preventDefault()}
            >
              <LogoutButton
                variant="ghost"
                className="h-auto w-full justify-start gap-2 px-2 py-1.5 font-normal text-destructive hover:text-destructive"
              >
                <Icons.logOut />
                {t("button")}
              </LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
