"use client";

import type { SelectOptionGroup } from "@dukkani/ui/components/forms/select-field";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { productFormOptions } from "@/shared/lib/product/form";
import { useCurrentStoreCurrency } from "@/shared/lib/store/current-currency.hook";
import {
  ProductFormImages,
  ProductFormImagesSkeleton,
} from "./product-form-images";

function EssentialsFieldRow({
  labelWidth = "w-28",
  controlHeight = "h-10",
}: {
  labelWidth?: string;
  controlHeight?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className={`h-4 ${labelWidth}`} />
      <Skeleton className={`w-full ${controlHeight} rounded-md`} />
    </div>
  );
}

export function ProductFormEssentialsSkeleton() {
  return (
    <>
      <EssentialsFieldRow />
      <EssentialsFieldRow controlHeight="h-24" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
      <EssentialsFieldRow labelWidth="w-20" />
      <ProductFormImagesSkeleton />
    </>
  );
}

export const ProductFormEssentials = withForm({
  ...productFormOptions,
  props: {
    categoriesOptions: [] as SelectOptionGroup[],
    onOpenCategoryDrawer: () => {},
    optimizeFiles: async (files: File[]) => files,
  },
  render: function Render({
    form,
    categoriesOptions,
    onOpenCategoryDrawer,
    optimizeFiles,
  }) {
    const t = useTranslations("products.create");
    const currency = useCurrentStoreCurrency();

    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextInput
              label={t("form.name.label")}
              placeholder={t("form.name.placeholder")}
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.TextAreaInput
              label={t("form.description.label")}
              placeholder={t("form.description.placeholder")}
            />
          )}
        </form.AppField>
        <form.Subscribe selector={(s) => s.values.hasVariants}>
          {(hasVariants) =>
            hasVariants ? null : (
              <div className="flex items-start justify-between gap-4">
                <form.AppField name="price">
                  {(field) => (
                    <field.PriceInput
                      label={t("form.price.label")}
                      currency={currency}
                    />
                  )}
                </form.AppField>
                <form.AppField name="stock">
                  {(field) => (
                    <field.NumberInput label={t("form.stock.label")} />
                  )}
                </form.AppField>
              </div>
            )
          }
        </form.Subscribe>
        <form.AppField name="categoryId">
          {(field) => (
            <field.SelectInput
              label={t("form.category.label")}
              placeholder={t("form.category.uncategorized")}
              options={categoriesOptions}
              onNewOptionClick={onOpenCategoryDrawer}
            />
          )}
        </form.AppField>
        <form.AppField name="images">
          {() => <ProductFormImages optimizeFiles={optimizeFiles} />}
        </form.AppField>
      </>
    );
  },
});
