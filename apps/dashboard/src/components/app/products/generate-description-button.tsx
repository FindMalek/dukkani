"use client";

import type { ProductImageAttachment } from "@dukkani/common/schemas/product/form";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { handleAPIError } from "@/shared/api/error-handler";
import { appMutations } from "@/shared/api/mutations";
import type { ProductFormApi } from "@/shared/lib/product/form";

interface GenerateDescriptionButtonProps {
  form: ProductFormApi;
  storeId: string;
  currency?: string;
  categoryName?: string;
  snapshot: {
    name: string;
    price: string;
    hasVariants: boolean;
    variantOptions: { name: string; values: { value: string }[] }[];
    images: ProductImageAttachment[];
  };
}

export function GenerateDescriptionButton({
  form,
  storeId,
  currency,
  categoryName,
  snapshot,
}: GenerateDescriptionButtonProps) {
  const t = useTranslations("products.create.form.generateAi");
  const generateMutation = useMutation(
    appMutations.product.generateDescription({
      onSuccess: (data) => {
        form.setFieldValue("description", data.description);
      },
      onError: (error) => handleAPIError(error),
    }),
  );

  const title = snapshot.name.trim();
  const localImages = snapshot.images
    .filter(
      (image): image is Extract<ProductImageAttachment, { kind: "local" }> =>
        image.kind === "local",
    )
    .slice(0, 3)
    .map((image) => image.file);
  const price = Number(snapshot.price);

  const handleGenerate = () => {
    generateMutation.mutate({
      storeId,
      title,
      categoryName,
      price: Number.isFinite(price) && price >= 0 ? price : undefined,
      currency,
      hasVariants: snapshot.hasVariants,
      variantOptions: snapshot.hasVariants
        ? snapshot.variantOptions.map((option) => ({
            name: option.name,
            values: option.values.map((value) => value.value),
          }))
        : [],
      images: localImages,
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={!title || generateMutation.isPending}
      onClick={handleGenerate}
    >
      {generateMutation.isPending ? (
        <Spinner className="size-4 animate-spin" />
      ) : (
        <Icons.beauty className="size-4" />
      )}
      {generateMutation.isPending ? t("generating") : t("button")}
    </Button>
  );
}
