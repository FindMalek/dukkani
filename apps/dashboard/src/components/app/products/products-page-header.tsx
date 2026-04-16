"use client";

import { useT } from "next-i18next/client";

export function ProductsPageHeader() {
  const { t } = useT("pages", { keyPrefix: "products.list" });

  return (
    <div className="mb-6">
      <h1 className="font-bold text-2xl md:text-3xl">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground text-sm md:text-base">
        {t("description")}
      </p>
    </div>
  );
}
