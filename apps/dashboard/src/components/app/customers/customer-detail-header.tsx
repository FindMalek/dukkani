"use client";

import { Button } from "@dukkani/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dukkani/ui/components/dropdown-menu";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";

interface CustomerDetailHeaderProps {
  title: string;
  contactHref: string | null;
  isWhatsApp: boolean;
  canDelete: boolean;
  onDeleteRequest: () => void;
}

export function CustomerDetailHeader({
  title,
  contactHref,
  isWhatsApp,
  canDelete,
  onDeleteRequest,
}: CustomerDetailHeaderProps) {
  const t = useTranslations("customers.detail");

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-1">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link
            href={RoutePaths.CUSTOMERS.INDEX.url}
            aria-label={t("backToCustomers")}
          >
            <Icons.arrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="truncate font-semibold text-base">{title}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("moreOptions")}
            className="shrink-0"
          >
            <Icons.moreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {contactHref && (
            <DropdownMenuItem asChild>
              <Link href={contactHref}>
                {isWhatsApp ? (
                  <Icons.whatsapp className="size-4" />
                ) : (
                  <Icons.phone className="size-4" />
                )}
                {isWhatsApp ? t("whatsapp") : t("call")}
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            variant="destructive"
            disabled={!canDelete}
            onClick={onDeleteRequest}
          >
            <Icons.trash className="size-4" />
            <div className="flex flex-col">
              <span>{t("delete")}</span>
              {!canDelete && (
                <span className="text-muted-foreground text-xs">
                  {t("deleteBlockedReason")}
                </span>
              )}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
