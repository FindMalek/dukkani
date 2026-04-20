"use client";

import { selectionKey } from "@dukkani/common/lib";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ProductFormApi } from "@/shared/lib/product/form";
import type { ProductFormVariantsField } from "@/shared/lib/variant/variants-field.hook";
import {
  getVariantLabel,
  resolveVariantMatrixThumbSrc,
} from "@/shared/lib/variant/variants-form.util";

type ProductsVariantMatrixSectionProps = {
  form: ProductFormApi;
  v: ProductFormVariantsField;
  imagePreviewById: Record<string, string>;
};

export function ProductsVariantMatrixSection({
  form,
  v,
  imagePreviewById,
}: ProductsVariantMatrixSectionProps) {
  const t = useTranslations("products.create");

  return (
    <form.Subscribe
      selector={(s) => ({
        variants: s.values.variants ?? [],
        images: s.values.images ?? [],
        options: s.values.variantOptions ?? [],
      })}
    >
      {({ variants, images }) =>
        variants.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-0.5">
              {v.optionOrderLabel ? (
                <p className="text-muted-foreground text-xs">
                  <span className="font-medium text-foreground">
                    {t("form.variants.optionOrder.label")}:
                  </span>{" "}
                  {v.optionOrderLabel}
                </p>
              ) : null}
              <Badge variant="secondary" className="ml-auto">
                {t("form.variants.matrix.variantCount", {
                  count: variants.length,
                })}
              </Badge>
            </div>

            {variants.map((variant, idx) => {
              const label = getVariantLabel(variant.selections ?? {});
              const stock = Number.parseInt(String(variant.stock), 10);
              const inStock = stock > 0;
              const priceNum = variant.price
                ? Number.parseFloat(String(variant.price))
                : undefined;

              const thumbSrc = resolveVariantMatrixThumbSrc(
                variant.imageRef,
                images,
                imagePreviewById,
              );

              return (
                <Card
                  key={`${idx}-${selectionKey(variant.selections ?? {})}`}
                  className="flex flex-row items-center gap-3 border px-3 py-3 shadow-sm"
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => v.setImagePickerVariantIdx(idx)}
                    className="relative size-12 shrink-0 overflow-hidden rounded-lg p-0"
                    aria-label={`${t("form.variants.imagePicker.title")}: ${label}`}
                  >
                    {thumbSrc ? (
                      <Image
                        src={thumbSrc}
                        alt={label}
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized
                      />
                    ) : (
                      <Icons.image className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">{label}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-block h-2 w-2 rounded-full",
                          inStock ? "bg-primary" : "bg-muted-foreground/40",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs",
                          inStock ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {inStock
                          ? t("form.variants.matrix.inStock", { count: stock })
                          : t("form.variants.matrix.outOfStock")}
                      </span>
                      {variant.sku ? (
                        <span className="text-muted-foreground text-xs">
                          SKU {variant.sku}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {priceNum !== undefined ? (
                    <p className="shrink-0 text-right text-sm">
                      {v.formatPrice(priceNum)}
                    </p>
                  ) : null}

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => v.setEditSheetVariantIdx(idx)}
                    className="shrink-0 text-muted-foreground"
                    aria-label={t("form.variants.list.edit")}
                  >
                    <Icons.chevronRight className="h-4 w-4" />
                  </Button>
                </Card>
              );
            })}
          </div>
        ) : null
      }
    </form.Subscribe>
  );
}
