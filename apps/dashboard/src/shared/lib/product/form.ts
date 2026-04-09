import {
  type ProductFormInput,
  productFormSchema,
} from "@dukkani/common/schemas/product/form";
import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { handleAPIError } from "@/shared/api/error-handler";
import { appMutations } from "@/shared/api/mutations";
import { client } from "@/shared/api/orpc";
import { appQueries } from "@/shared/api/queries";
import { RoutePaths } from "@/shared/config/routes";

export const productFormOptions = formOptions({
  defaultValues: {
    name: "",
    description: "",
    price: "",
    stock: "1",
    published: false,
    categoryId: "",
    hasVariants: false,
    imageFiles: [],
    variantOptions: [],
  } as ProductFormInput,
  validators: {
    onChange: productFormSchema,
    onBlur: productFormSchema,
  },
});

/**
 * Create-product flow: TanStack Form + categories + create mutation.
 * Edit flow can extend this hook later with different defaultValues/onSubmit.
 */
export function useProductForm({ storeId }: { storeId: string }) {
  const router = useRouter();
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  const { data: categories } = useQuery({
    ...appQueries.category.all({ input: { storeId } }),
  });
  const createProductMutation = useMutation(appMutations.product.create());

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
  };
}
