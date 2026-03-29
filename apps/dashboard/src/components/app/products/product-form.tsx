"use client";

import { productFormSchema } from "@dukkani/common/schemas/product/form";
import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import {
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useCategoriesQuery } from "@/hooks/api/use-categories";
import { useProductsController } from "@/hooks/controllers/use-products-controller";
import { compressImagesForUpload } from "@/lib/compress-images";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";
import { CategoryDrawer } from "./category-drawer";
import { ProductFormActions } from "./product-form-actions";
import { ProductFormEssentials } from "./product-form-essentials";
import { productFormOptions } from "./product-form-options";
import type { ProductFormTranslationNamespace } from "./product-form-types";
import { ProductFormVariants } from "./product-form-variants";

export interface ProductFormHandle {
  submit: (published: boolean) => void;
}

const PRODUCT_FORM_TRANSLATION_NS: ProductFormTranslationNamespace =
  "products.create";

export const ProductForm = forwardRef<ProductFormHandle, { storeId: string }>(
  ({ storeId }, ref) => {
    const router = useRouter();
    const t = useTranslations(PRODUCT_FORM_TRANSLATION_NS);
    const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

    const { createProductMutationOptions } = useProductsController();
    const { data: categories } = useCategoriesQuery({
      storeId,
    });

    const createProductMutation = useMutation(createProductMutationOptions);
    const form = useAppForm({
      ...productFormOptions,
      onSubmit: async ({ value }) => {
        const imageUrls = await (async () => {
          if (value.imageFiles.length === 0) {
            return [];
          }

          try {
            const res = await client.product.uploadImages({
              storeId,
              files: value.imageFiles,
            });
            return res.files.map((file) => file.url);
          } catch (error) {
            handleAPIError(error);
            return null;
          }
        })();

        if (imageUrls === null) {
          return;
        }

        const cleanedFormData = productFormSchema.parse(value);
        const cleanedData = {
          ...cleanedFormData,
          imageUrls,
          storeId,
        };
        await handleCreateProduct(cleanedData);
      },
    });
    const handleCreateProduct = useCallback(
      async (input: CreateProductInput) => {
        await createProductMutation.mutateAsync(input, {
          onSuccess: () => {
            router.push(RoutePaths.PRODUCTS.INDEX.url);
            form.reset();
          },
          onError: (error) => {
            handleAPIError(error);
          },
        });
      },
      [createProductMutation, form, router],
    );

    const handleOpenCategoryDrawer = useCallback(() => {
      setIsCategoryDrawerOpen(true);
    }, []);

    const categoriesOptions = useMemo(() => {
      if (!categories?.length) return [];
      return [
        {
          id: "categories",
          options: categories.map((category) => ({
            id: category.id,
            name: category.name,
          })),
        },
      ];
    }, [categories]);

    const handleCategoryCreated = useCallback(
      (categoryId: string) => {
        form.setFieldValue("categoryId", categoryId);
      },
      [form],
    );

    useImperativeHandle(ref, () => ({
      submit: (published: boolean) => {
        form.setFieldValue("published", published);
        form.handleSubmit();
      },
    }));

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
                    translationNamespace={PRODUCT_FORM_TRANSLATION_NS}
                    categoriesOptions={categoriesOptions}
                    onOpenCategoryDrawer={handleOpenCategoryDrawer}
                    optimizeFiles={compressImagesForUpload}
                  />
                  <ProductFormVariants
                    form={form}
                    translationNamespace={PRODUCT_FORM_TRANSLATION_NS}
                  />
                  <ProductFormActions
                    form={form}
                    translationNamespace={PRODUCT_FORM_TRANSLATION_NS}
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
  },
);

ProductForm.displayName = "ProductForm";
