"use client";

import { FieldGroup, FieldSet } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { useTranslations } from "next-intl";
import { forwardRef, useImperativeHandle } from "react";
import { useProductForm } from "@/hooks/use-product-form";
import { compressImagesForUpload } from "@/lib/compress-images";
import { CategoryDrawer } from "./category-drawer";
import { ProductFormActions } from "./product-form-actions";
import { ProductFormEssentials } from "./product-form-essentials";
import { ProductFormSkeleton } from "./product-form-skeleton";
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
    storeMismatch,
    productQuery,
    isEdit,
    hasDraft,
    submitIntentRef,
    handleDiscardDraft,
    discardDraftMutation,
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
                <ProductFormActions
                  form={form}
                  isEdit={isEdit}
                  hasDraft={hasDraft}
                  submitIntentRef={submitIntentRef}
                  onDiscardDraft={handleDiscardDraft}
                  isDiscardingDraft={discardDraftMutation.isPending}
                />
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
