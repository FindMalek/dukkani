"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

interface ProductsPageHeaderProps {
  /** Action rendered next to the heading — the caller controls its own responsive visibility (e.g. "Add product", desktop-only). */
  action?: ReactNode;
}

export function ProductsPageHeader({ action }: ProductsPageHeaderProps) {
  const t = useTranslations("products.list");

  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          {t("description")}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
