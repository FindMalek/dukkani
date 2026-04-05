"use client";

import { productFormSchema } from "@dukkani/common/schemas/product/form";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@dukkani/common/schemas/product/input";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCategoriesQuery } from "@/hooks/api/use-categories.hook";
import {
  createProductMutationOptions,
  invalidateProductListQueries,
  useProductQuery,
  useUpdateProductMutation,
} from "@/hooks/api/use-products.hook";
import { handleAPIError } from "@/lib/error";
import { mapProductToFormValues } from "@/lib/map-product-to-form";
import { client } from "@/lib/orpc";
import { productFormOptions } from "@/lib/product-form-options";
import { queryKeys } from "@/lib/query-keys";
import { RoutePaths } from "@/lib/routes";

export type ProductSubmitIntent = "save" | "saveAndPublish";
export type ProductSubmitIntentRef = { current: ProductSubmitIntent };

export function useProductForm({
  storeId,
  productId,
}: {
  storeId: string;
  productId?: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = Boolean(productId);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  const productQuery = useProductQuery(productId ?? "", {
    enabled: Boolean(isEdit && productId),
  });
  const createProductMutation = useMutation(createProductMutationOptions);
  const updateProductMutation = useUpdateProductMutation();
  const submitIntentRef = useRef<ProductSubmitIntent>("save");

  const publishProductMutation = useMutation({
    mutationFn: (id: string) => client.product.publish({ id }),
    onSuccess: async (data) => {
      await invalidateProductListQueries(queryClient);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.products.byId(data.id),
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats(),
      });
    },
  });

  const discardDraftMutation = useMutation({
    mutationFn: (id: string) => client.product.discardDraft({ id }),
    onSuccess: async (data) => {
      await invalidateProductListQueries(queryClient);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.products.byId(data.id),
        refetchType: "all",
      });
    },
  });

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
        if (!productId) {
          handleAPIError(new Error("Missing product id"));
          return;
        }
        const editProductId = productId;

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
          id: editProductId,
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

        try {
          await updateProductMutation.mutateAsync(payload);
          if (submitIntentRef.current === "saveAndPublish") {
            await publishProductMutation.mutateAsync(editProductId);
            router.push(RoutePaths.PRODUCTS.INDEX.url);
          } else {
            await queryClient.invalidateQueries({
              queryKey: queryKeys.products.byId(editProductId),
            });
            await productQuery.refetch();
          }
        } catch (error) {
          handleAPIError(error);
        }
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

  const hasDraft = Boolean(productQuery.data?.hasDraft);

  const handleDiscardDraft = useCallback(async () => {
    if (!productId) return;
    try {
      const data = await discardDraftMutation.mutateAsync(productId);
      const mapped = mapProductToFormValues(data);
      initialImageUrlsRef.current = mapped.images
        .filter((item) => item.kind === "remote")
        .map((item) => item.url);
      form.reset(mapped);
    } catch (error) {
      handleAPIError(error);
    }
  }, [productId, discardDraftMutation, form]);

  return {
    form,
    categoriesOptions,
    isCategoryDrawerOpen,
    setIsCategoryDrawerOpen,
    handleOpenCategoryDrawer,
    handleCategoryCreated,
    isEdit,
    productQuery,
    hasDraft,
    submitIntentRef,
    publishProductMutation,
    discardDraftMutation,
    handleDiscardDraft,
    storeMismatch:
      isEdit &&
      Boolean(productQuery.data) &&
      productQuery.data!.storeId !== storeId,
  };
}
