"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { RoutePaths } from "@/shared/config/routes";

export function OrderDetailHeader({
  title,
  titleClassName,
  endSlot,
}: {
  title: string;
  titleClassName?: string;
  endSlot?: ReactNode;
}) {
  const t = useTranslations("orders.detail");

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-1">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link
            href={RoutePaths.ORDERS.INDEX.url}
            aria-label={t("backToOrders")}
          >
            <Icons.arrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className={cn("truncate font-semibold", titleClassName)}>
          {title}
        </h1>
      </div>
      {endSlot ? (
        <div className="flex shrink-0 items-center gap-2">{endSlot}</div>
      ) : null}
    </div>
  );
}
