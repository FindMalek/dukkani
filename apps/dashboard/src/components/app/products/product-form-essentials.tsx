"use client";

import type { SelectOptionGroup } from "@dukkani/ui/components/forms/select-field";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { handleAPIError } from "@/shared/api/error-handler";
import { client } from "@/shared/api/orpc";
import { productFormOptions } from "@/shared/lib/product/form";
import { useCurrentStoreCurrency } from "@/shared/lib/store/current-currency.hook";
import { GenerateDescriptionButton } from "./generate-description-button";
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
    storeId: "",
    categoriesOptions: [] as SelectOptionGroup[],
    categoryNewOptionTrigger: null as ReactNode,
    optimizeFiles: async (files: File[]) => files,
  },
  render: function Render({
    form,
    storeId,
    categoriesOptions,
    categoryNewOptionTrigger,
    optimizeFiles,
  }) {
    const t = useTranslations("products.create");
    const currency = useCurrentStoreCurrency();

    const handleInlineImageUpload = async (file: File) => {
      const res = await client.product.uploadImages({
        storeId,
        files: [file],
      });
      const url = res.files[0]?.url;
      if (!url) {
        throw new Error("Upload did not return a file URL");
      }
      return url;
    };

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
        {/* `contents` on mobile keeps both children flush with FieldGroup's own
            gap-7 rhythm (unchanged placement below the field); at xl: it
            becomes a positioning context so the button can float at the
            description field's top-right instead of pushing content down. */}
        <div className="contents xl:relative xl:block">
          <form.AppField name="description">
            {(field) => (
              <field.MarkdownEditorInput
                label={t("form.description.label")}
                placeholder={t("form.description.placeholder")}
                onImageUpload={handleInlineImageUpload}
                onImageUploadError={handleAPIError}
                imageUploadLabel={t("form.generateAi.insertImageLabel")}
              />
            )}
          </form.AppField>
          <form.Subscribe
            selector={(s) => ({
              name: s.values.name,
              price: s.values.price,
              categoryId: s.values.categoryId,
              hasVariants: s.values.hasVariants,
              variantOptions: s.values.variantOptions,
              images: s.values.images,
            })}
          >
            {(snapshot) => {
              const selectedCategoryName = categoriesOptions[0]?.options.find(
                (option) => option.id === snapshot.categoryId,
              )?.name;
              return (
                <div className="xl:absolute xl:top-0 xl:right-0">
                  <GenerateDescriptionButton
                    form={form}
                    storeId={storeId}
                    currency={currency}
                    categoryName={
                      typeof selectedCategoryName === "string"
                        ? selectedCategoryName
                        : undefined
                    }
                    snapshot={snapshot}
                  />
                </div>
              );
            }}
          </form.Subscribe>
        </div>
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
              newOptionTrigger={categoryNewOptionTrigger}
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
