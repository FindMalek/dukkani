"use client";

import { SafeMarkdown } from "@dukkani/ui/components/markdown/safe-markdown";
import { useTranslations } from "next-intl";

interface ProductDescriptionProps {
  description: string | null;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  const t = useTranslations("storefront.store.product.description");

  if (!description) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-muted-foreground text-sm">
        {t("label")}
      </h3>
      <SafeMarkdown className="prose prose-sm max-w-none text-muted-foreground text-sm leading-relaxed">
        {description}
      </SafeMarkdown>
    </div>
  );
}
