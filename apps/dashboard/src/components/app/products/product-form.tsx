"use client";

import { Button } from "@dukkani/ui/components/button";
import { FieldGroup, FieldSet } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";
import { forwardRef, useImperativeHandle } from "react";
import { compressImagesForUpload } from "@/shared/lib/image-compression";
import { useProductForm } from "@/shared/lib/product/form";
import { CategoryDrawer } from "./category-drawer";
import { ProductFormActions } from "./product-form-actions";
import { ProductFormEssentials } from "./product-form-essentials";
import { ProductFormPreview } from "./product-form-preview";
import { ProductFormSkeleton } from "./product-form-skeleton";
import { ProductFormVariants } from "./products-variant-form";

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
    <div className="xl:grid xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] xl:items-start xl:gap-8">
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
                  storeId={storeId}
                  categoriesOptions={categoriesOptions}
                  categoryNewOptionTrigger={
                    <CategoryDrawer
                      trigger={
                        <Button type="button" variant="outline" size="icon">
                          <Icons.plus className="size-4" />
                        </Button>
                      }
                      onCategoryCreated={handleCategoryCreated}
                      open={isCategoryDrawerOpen}
                      onOpenChange={setIsCategoryDrawerOpen}
                    />
                  }
                  optimizeFiles={compressImagesForUpload}
                />
                <ProductFormVariants form={form} />
                <ProductFormActions form={form} />
              </form.AppForm>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </Form>
      {/* Live preview: sticky, desktop-only (>=1280px). Below xl it stays out of the DOM
          so the single-column layout matches today's behavior exactly. */}
      <aside className="hidden xl:sticky xl:top-20 xl:block xl:self-start xl:pr-2">
        <ProductFormPreview form={form} />
      </aside>
    </div>
  );
});

ProductForm.displayName = "ProductForm";
