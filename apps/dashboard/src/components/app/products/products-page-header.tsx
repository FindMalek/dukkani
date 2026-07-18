"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

interface ProductsPageHeaderProps {
  /** Desktop-only action rendered next to the heading (e.g. "Add product"). */
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
      {action && <div className="hidden shrink-0 xl:block">{action}</div>}
    </div>
  );
}
