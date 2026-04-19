"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { QuickActionButton } from "@dukkani/ui/components/quick-action-button";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { RoutePaths } from "@/shared/config/routes";

export function QuickActions() {
  const { t } = useT("pages", { keyPrefix: "dashboard.overview.quickActions" });

  return (
    <div className="space-y-4">
      <h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
        {t("title")}
      </h2>
      <div className="grid gap-2">
        <Link href={RoutePaths.PRODUCTS.NEW.url}>
          <QuickActionButton
            variant="primary"
            icon={Icons.plus}
            className="h-auto"
          >
            {t("addProduct")}
          </QuickActionButton>
        </Link>
        <Link href={RoutePaths.ORDERS.INDEX.url}>
          <QuickActionButton
            variant="outline"
            icon={Icons.package}
            className="h-auto"
          >
            {t("viewOrders")}
          </QuickActionButton>
        </Link>
      </div>
    </div>
  );
}
