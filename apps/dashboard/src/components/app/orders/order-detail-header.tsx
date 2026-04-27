"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";

export function OrderDetailHeader({
  title,
  titleClassName,
}: {
  title: string;
  titleClassName?: string;
}) {
  const t = useTranslations("orders.detail");

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="icon" asChild>
        <Link
          href={RoutePaths.ORDERS.INDEX.url}
          aria-label={t("backToOrders")}
        >
          <Icons.arrowLeft className="size-4" />
        </Link>
      </Button>
      <h1 className={cn("font-semibold", titleClassName)}>{title}</h1>
      <div className="w-9" />
    </div>
  );
}
