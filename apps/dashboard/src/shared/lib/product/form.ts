"use client";

import {
  type ProductFormInput,
  productFormSchema,
} from "@dukkani/common/schemas/product/form";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@dukkani/common/schemas/product/input";
import { formVariantRowsToInput } from "@dukkani/common/utils";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { handleAPIError } from "@/shared/api/error-handler";
import { mapProductToFormValues } from "@/shared/api/map-product-to-form";
import { appMutations } from "@/shared/api/mutations";
import { api, client } from "@/shared/api/orpc";
import { appQueries } from "@/shared/api/queries";
import { RoutePaths } from "@/shared/config/routes";

export const productFormOptions = formOptions({
  defaultValues: {
    name: "",
    description: "",
    price: "",
    stock: "1",
    published: true,
    categoryId: "",
    hasVariants: false,
    images: [],
    variantOptions: [],
    variants: [],
  } as ProductFormInput,
  validators: {
    onChange: productFormSchema,
    onBlur: productFormSchema,
  },
});

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

  const productQuery = useQuery({
    ...appQueries.product.byId({ input: { id: productId ?? "" } }),
    enabled: Boolean(isEdit && productId),
  });

  const createProductMutation = useMutation(appMutations.product.create());
  const updateProductMutation = useMutation(appMutations.product.update());

  const publishProductMutation = useMutation({
    mutationFn: (id: string) => client.product.publish({ id }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(api.product.getAll.queryOptions());
      await queryClient.invalidateQueries(
        api.product.getById.queryOptions({ input: { id: data.id } }),
      );
      await queryClient.invalidateQueries(
        api.dashboard.getStats.queryOptions(),
      );
    },
  });

  const initialLoadDone = useRef(false);
  const initialImageUrlsRef = useRef<string[]>([]);

  const form = useAppForm({
    ...productFormOptions,
    onSubmit: async ({ value }) => {
      const valueLive = { ...value, published: true };

      const localFiles = valueLive.images
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
      const finalUrls = valueLive.images.map((item) => {
        if (item.kind === "remote") {
          return item.url;
        }
        const url = uploadedUrls[uploadIndex];
        uploadIndex += 1;
        return url;
      });

      const cleanedFormData = productFormSchema.parse(valueLive);
      const rest = cleanedFormData;

      if (isEdit) {
        if (!productId) {
          handleAPIError(new Error("Missing product id"));
          return;
        }
        const editProductId = productId;

        const currentRemoteUrls = valueLive.images
          .filter((item) => item.kind === "remote")
          .map((item) => item.url);
        const hasLocal = valueLive.images.some((item) => item.kind === "local");
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
          published: true,
          categoryId: rest.categoryId,
          hasVariants: rest.hasVariants,
          variantOptions: rest.hasVariants ? rest.variantOptions : undefined,
          variants: rest.hasVariants
            ? formVariantRowsToInput(rest.variants)
            : undefined,
          ...(sameAsInitial ? {} : { imageUrls: finalUrls }),
        };

        try {
          await updateProductMutation.mutateAsync(payload);
          await publishProductMutation.mutateAsync(editProductId);
          router.push(RoutePaths.PRODUCTS.INDEX.url);
        } catch (error) {
          handleAPIError(error);
        }
        return;
      }

      const cleanedData: CreateProductInput = {
        ...rest,
        published: true,
        imageUrls: finalUrls,
        storeId,
        variants: rest.hasVariants
          ? formVariantRowsToInput(rest.variants)
          : undefined,
        variantOptions: rest.hasVariants ? rest.variantOptions : undefined,
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

  const { data: categories } = useQuery({
    ...appQueries.category.all({ input: { storeId } }),
  });

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

  return {
    form,
    categoriesOptions,
    isCategoryDrawerOpen,
    setIsCategoryDrawerOpen,
    handleOpenCategoryDrawer,
    handleCategoryCreated,
    isEdit,
    productQuery,
    publishProductMutation,
    storeMismatch:
      isEdit &&
      Boolean(productQuery.data) &&
      productQuery.data!.storeId !== storeId,
  };
}
