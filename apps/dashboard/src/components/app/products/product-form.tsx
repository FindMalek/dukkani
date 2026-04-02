"use client";

import {
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useTranslations } from "next-intl";
import { forwardRef, useImperativeHandle } from "react";
import { useProductForm } from "@/hooks/use-product-form";
import { compressImagesForUpload } from "@/lib/compress-images";
import { CategoryDrawer } from "./category-drawer";
import { ProductFormActions } from "./product-form-actions";
import { ProductFormEssentials } from "./product-form-essentials";
import { ProductFormVariants } from "./product-form-variants";

export interface ProductFormHandle {
  submit: (published: boolean) => void;
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
    variantStructureLocked,
    storeMismatch,
    productQuery,
  } = useProductForm({ storeId, productId });

  useImperativeHandle(ref, () => ({
    submit: (published: boolean) => {
      form.setFieldValue("published", published);
      form.handleSubmit();
    },
  }));

  if (storeMismatch) {
    return (
      <p className="px-2 text-center text-destructive text-sm">
        This product belongs to another store. Switch stores to edit it.
      </p>
    );
  }

  if (productId && productQuery.isPending) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (productId && productQuery.isError) {
    return (
      <p className="px-2 text-center text-destructive text-sm">
        Could not load this product. Try again or go back to the list.
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
            <FieldLegend>{t("sections.essentials")}</FieldLegend>
            <FieldGroup>
              <form.AppForm>
                <ProductFormEssentials
                  form={form}
                  categoriesOptions={categoriesOptions}
                  onOpenCategoryDrawer={handleOpenCategoryDrawer}
                  optimizeFiles={compressImagesForUpload}
                />
                <ProductFormVariants
                  form={form}
                  variantStructureLocked={variantStructureLocked}
                />
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
