"use client";

import { Button } from "@dukkani/ui/components/button";
import { FieldGroup, FieldSet } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { cn } from "@dukkani/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { appQueries } from "@/shared/api/queries";
import { compressImagesForUpload } from "@/shared/lib/image-compression";
import { useProductForm } from "@/shared/lib/product/form";
import { getProductPreviewUrl } from "@/shared/lib/store/url.util";
import { CategoryDrawer } from "./category-drawer";
import { ProductFormActions } from "./product-form-actions";
import { ProductFormEssentials } from "./product-form-essentials";
import { ProductFormPreview } from "./product-form-preview";
import { ProductFormSkeleton } from "./product-form-skeleton";
import { ProductFormVariants } from "./products-variant-form";

export interface ProductFormHandle {
  submit: () => void;
}

const PREVIEW_VISIBLE_STORAGE_KEY = "product-form-preview-visible";

/** Persists the merchant's preview show/hide preference across sessions (desktop-only feature). */
function usePreviewVisible() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PREVIEW_VISIBLE_STORAGE_KEY);
      if (stored !== null) {
        setIsVisible(stored !== "false");
      }
    } catch {
      // Storage unavailable (e.g. private browsing) — keep the default.
    }
  }, []);

  const toggle = useCallback(() => {
    setIsVisible((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(
          PREVIEW_VISIBLE_STORAGE_KEY,
          String(next),
        );
      } catch {
        // Storage unavailable — toggle still works for this session.
      }
      return next;
    });
  }, []);

  return [isVisible, toggle] as const;
}

export const ProductForm = forwardRef<
  ProductFormHandle,
  { storeId: string; productId?: string }
>(({ storeId, productId }, ref) => {
  const t = useTranslations("products.create");
  const locale = useLocale();
  const {
    form,
    categoriesOptions,
    isCategoryDrawerOpen,
    setIsCategoryDrawerOpen,
    handleCategoryCreated,
    storeMismatch,
    productQuery,
  } = useProductForm({ storeId, productId });
  const { data: stores } = useQuery(appQueries.store.all());
  const activeStore = stores?.find((store) => store.id === storeId);

  const previewUrl =
    productId && activeStore && productQuery.data?.published
      ? getProductPreviewUrl(activeStore, productId, locale)
      : undefined;

  const [isPreviewVisible, togglePreviewVisible] = usePreviewVisible();

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
    <div className="flex flex-col gap-2">
      <div className="hidden justify-end xl:flex">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground"
          onClick={togglePreviewVisible}
        >
          {isPreviewVisible ? (
            <Icons.eyeOff className="size-4" />
          ) : (
            <Icons.eye className="size-4" />
          )}
          {isPreviewVisible ? t("preview.hide") : t("preview.show")}
        </Button>
      </div>
      <div
        className={cn(
          "xl:grid xl:items-start xl:gap-8",
          isPreviewVisible
            ? "xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
            : "xl:grid-cols-1",
        )}
      >
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
        {/* Live preview: sticky, desktop-only (>=1280px), toggleable via the
            button above. Below xl it stays out of the DOM so the single-column
            layout matches today's behavior exactly. */}
        {isPreviewVisible && (
          <aside className="hidden xl:sticky xl:top-20 xl:flex xl:flex-col xl:gap-2 xl:self-start xl:pr-2">
            {previewUrl && (
              <Button variant="outline" size="sm" className="self-end" asChild>
                <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                  <Icons.externalLink className="size-4" />
                  {t("previewInStorefront")}
                </a>
              </Button>
            )}
            <ProductFormPreview form={form} />
          </aside>
        )}
      </div>
    </div>
  );
});

ProductForm.displayName = "ProductForm";
