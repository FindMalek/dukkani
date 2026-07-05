"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/shared/config/routes";

interface CustomersPageHeaderProps {
  selectionActive: boolean;
  onToggleSelection: () => void;
}

export function CustomersPageHeader({
  selectionActive,
  onToggleSelection,
}: CustomersPageHeaderProps) {
  const t = useTranslations("customers.list");

  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          {t("description")}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant={selectionActive ? "default" : "ghost"}
          size="icon"
          onClick={onToggleSelection}
          aria-label={selectionActive ? t("cancelSelection") : t("select")}
        >
          {selectionActive ? (
            <Icons.x className="size-4" />
          ) : (
            <Icons.checkSquare className="size-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          aria-label={t("addCustomer")}
        >
          <Link href={RoutePaths.CUSTOMERS.NEW.url}>
            <Icons.userPlus className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
