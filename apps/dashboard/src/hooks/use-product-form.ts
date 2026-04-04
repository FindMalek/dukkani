"use client";

import { productFormSchema } from "@dukkani/common/schemas/product/form";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@dukkani/common/schemas/product/input";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCategoriesQuery } from "@/hooks/api/use-categories.hook";
import {
  createProductMutationOptions,
  useProductQuery,
  useUpdateProductMutation,
} from "@/hooks/api/use-products.hook";
import { handleAPIError } from "@/lib/error";
import { mapProductToFormValues } from "@/lib/map-product-to-form";
import { client } from "@/lib/orpc";
import { productFormOptions } from "@/lib/product-form-options";
import { RoutePaths } from "@/lib/routes";

/**
 * Create or edit product: TanStack Form + categories + create/update mutation.
 */
export function useProductForm({
  storeId,
  productId,
}: {
  storeId: string;
  productId?: string;
}) {
  const router = useRouter();
  const isEdit = Boolean(productId);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  const productQuery = useProductQuery(productId ?? "", {
    enabled: Boolean(isEdit && productId),
  });
  const createProductMutation = useMutation(createProductMutationOptions);
  const updateProductMutation = useUpdateProductMutation();

  const initialLoadDone = useRef(false);
  const initialImageUrlsRef = useRef<string[]>([]);

  const form = useAppForm({
    ...productFormOptions,
    onSubmit: async ({ value }) => {
      const localFiles = value.images
        .filter((item) => item.kind === "local")
        .map((item) => item.file);

      const uploadedUrls = await (async () => {
        if (localFiles.length === 0) {
          return [];
        }

        try {
          const res = await client.product.uploadImages({
            storeId,
            files: localFiles,
          });
          return res.files.map((file) => file.url);
        } catch (error) {
          handleAPIError(error);
          return null;
        }
      })();

      if (uploadedUrls === null) {
        return;
      }

      let uploadIndex = 0;
      const finalUrls = value.images.map((item) => {
        if (item.kind === "remote") {
          return item.url;
        }
        const url = uploadedUrls[uploadIndex];
        uploadIndex += 1;
        return url;
      });

      const cleanedFormData = productFormSchema.parse(value);
      const rest = cleanedFormData;

      if (isEdit) {
        const currentRemoteUrls = value.images
          .filter((item) => item.kind === "remote")
          .map((item) => item.url);
        const hasLocal = value.images.some((item) => item.kind === "local");
        // Compare order (not sort): first image is primary on storefront.
        const sameAsInitial =
          !hasLocal &&
          currentRemoteUrls.length === initialImageUrlsRef.current.length &&
          currentRemoteUrls.every(
            (url, i) => url === initialImageUrlsRef.current[i],
          );

        const payload: UpdateProductInput = {
          id: productId ?? "",
          name: rest.name,
          description: rest.description,
          price: rest.price,
          stock: rest.stock,
          published: rest.published,
          categoryId: rest.categoryId,
          hasVariants: rest.hasVariants,
          variantOptions: rest.hasVariants ? rest.variantOptions : undefined,
          ...(sameAsInitial ? {} : { imageUrls: finalUrls }),
        };

        await updateProductMutation.mutateAsync(payload, {
          onSuccess: () => {
            router.push(RoutePaths.PRODUCTS.INDEX.url);
          },
          onError: (error) => {
            handleAPIError(error);
          },
        });
        return;
      }

      const cleanedData: CreateProductInput = {
        ...rest,
        imageUrls: finalUrls,
        storeId,
      };

      await createProductMutation.mutateAsync(cleanedData, {
        onSuccess: () => {
          router.push(RoutePaths.PRODUCTS.INDEX.url);
          form.reset();
        },
        onError: (error) => {
          handleAPIError(error);
        },
      });
    },
  });

  useEffect(() => {
    initialLoadDone.current = false;
  }, [productId]);

  useEffect(() => {
    if (!isEdit || !productId) return;
    if (!productQuery.data || productQuery.isLoading) return;
    if (productQuery.data.storeId !== storeId) return;
    if (initialLoadDone.current) return;

    const mapped = mapProductToFormValues(productQuery.data);
    initialImageUrlsRef.current = mapped.images
      .filter((item) => item.kind === "remote")
      .map((item) => item.url);
    form.reset(mapped);
    initialLoadDone.current = true;
  }, [
    isEdit,
    productId,
    productQuery.data,
    productQuery.isLoading,
    storeId,
    form,
  ]);

  const { data: categories } = useCategoriesQuery({ storeId });

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

  const variantStructureLocked =
    isEdit && productQuery.data
      ? productQuery.data.variantStructureLocked
      : false;

  return {
    form,
    categoriesOptions,
    isCategoryDrawerOpen,
    setIsCategoryDrawerOpen,
    handleOpenCategoryDrawer,
    handleCategoryCreated,
    isEdit,
    productQuery,
    variantStructureLocked,
    storeMismatch:
      isEdit &&
      Boolean(productQuery.data) &&
      productQuery.data!.storeId !== storeId,
  };
}
