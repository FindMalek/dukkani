"use client";

import { Button } from "@dukkani/ui/components/button";
import type { SelectOptionGroup } from "@dukkani/ui/components/forms/select-field";
import { Icons } from "@dukkani/ui/components/icons";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { useCurrentStoreCurrency } from "@/stores";
import { productFormOptions } from "@/lib/product-form-options";

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
            {(field) => <field.NumberInput label={t("form.stock.label")} />}
          </form.AppField>
        </div>
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
        <form.Subscribe selector={(state) => state.values.existingImageUrls}>
          {(existing) =>
            existing?.length ? (
              <div className="space-y-2">
                <p className="font-medium text-muted-foreground text-sm">
                  {t("form.existingPhotos")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {existing.map((url, index) => (
                    <div key={url} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt=""
                        className="size-24 rounded-xl border border-border object-cover"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-md"
                        onClick={() =>
                          form.setFieldValue("existingImageUrls", (prev) =>
                            (prev ?? []).filter((_, i) => i !== index),
                          )
                        }
                        aria-label={t("form.removePhoto")}
                      >
                        <Icons.x className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          }
        </form.Subscribe>
        <form.AppField name="imageFiles" mode="array">
          {(imageUrlsField) => (
            <imageUrlsField.ImagesInput
              label={t("form.photos")}
              optimizeFiles={optimizeFiles}
            />
          )}
        </form.AppField>
      </>
    );
  },
});
