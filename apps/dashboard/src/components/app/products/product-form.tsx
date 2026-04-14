"use client";

import { FieldGroup, FieldSet } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { useTranslations } from "next-intl";
import { forwardRef, useImperativeHandle } from "react";
import { compressImagesForUpload } from "@/shared/lib/image-compression";
import { useProductForm } from "@/shared/lib/product/form";
import { CategoryDrawer } from "./category-drawer";
import { ProductFormActions } from "./product-form-actions";
import { ProductFormEssentials } from "./product-form-essentials";
import { ProductFormSkeleton } from "./product-form-skeleton";
import { ProductFormAddons } from "./product-form-addons";
import { ProductFormVariants } from "./product-form-variants";

export interface ProductFormHandle {
  submit: () => void;
}

export const ProductForm = forwardRef<
  ProductFormHandle,
  { storeId: string; productId?: string }
>(({ storeId, productId }, ref) => {
  const t = useTranslations("products.create");
  const {
    form,
    categoriesOptions,
    isCategoryDrawerOpen,
    setIsCategoryDrawerOpen,
    handleOpenCategoryDrawer,
    handleCategoryCreated,
    storeMismatch,
    productQuery,
  } = useProductForm({ storeId, productId });

  useImperativeHandle(ref, () => ({
    submit: () => {
      void form.setFieldValue("published", true);
      form.handleSubmit();
    },
  }));

  if (storeMismatch) {
    return (
      <p className="px-2 text-center text-destructive text-sm">
        {t("storeMismatch")}
      </p>
    );
  }

  if (productId && productQuery.isPending) {
    return <ProductFormSkeleton loadingLabel={t("loadingProduct")} />;
  }

  if (productId && productQuery.isError) {
    return (
      <p className="px-2 text-center text-destructive text-sm">
        {t("loadError")}
      </p>
    );
  }

  return (
    <>
      <Form
        onSubmit={form.handleSubmit}
        className="flex flex-col gap-4 px-2 pb-24"
      >
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <form.AppForm>
                <ProductFormEssentials
                  form={form}
                  categoriesOptions={categoriesOptions}
                  onOpenCategoryDrawer={handleOpenCategoryDrawer}
                  optimizeFiles={compressImagesForUpload}
                />
                <ProductFormVariants form={form} />
                <ProductFormAddons form={form} />
                <ProductFormActions form={form} />
              </form.AppForm>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </Form>
      <CategoryDrawer
        onCategoryCreated={handleCategoryCreated}
        open={isCategoryDrawerOpen}
        onOpenChange={setIsCategoryDrawerOpen}
      />
    </>
  );
});

ProductForm.displayName = "ProductForm";
