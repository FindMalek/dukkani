"use client";

import type { SelectOptionGroup } from "@dukkani/ui/components/forms/select-field";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
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
            {(field) => <field.PriceInput label={t("form.price.label")} />}
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
