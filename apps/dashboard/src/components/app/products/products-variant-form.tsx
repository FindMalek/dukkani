"use client";

import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import {
  Collapsible,
  CollapsibleContent,
} from "@dukkani/ui/components/collapsible";
import { FieldSet } from "@dukkani/ui/components/field";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useObjectUrlPreviews } from "@dukkani/ui/hooks/use-object-url-previews";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { productFormOptions } from "@/shared/lib/product/form";
import { useProductFormVariantsField } from "@/shared/lib/variant/variants-field.hook";
import { ProductsVariantDrawers } from "./products-variant-drawers";
import { ProductsVariantMatrixSection } from "./products-variant-matrix-section";
import { ProductsVariantOptionsSection } from "./products-variant-options-section";

export const ProductFormVariants = withForm({
  ...productFormOptions,
  props: {},
  render: function Render({ form }) {
    const t = useTranslations("products.create");
    const v = useProductFormVariantsField(form);

    const formImages = form.state.values.images ?? [];
    type LocalAttachment = Extract<
      ProductFormInput["images"][number],
      { kind: "local" }
    >;
    const localImagePreviewItems = useMemo(
      () =>
        formImages
          .filter((a): a is LocalAttachment => a.kind === "local")
          .map((a) => ({ id: a.clientId, file: a.file })),
      [formImages],
    );
    const imagePreviewById = useObjectUrlPreviews(localImagePreviewItems);

    return (
      <>
        <form.AppField name="hasVariants" listeners={v.hasVariantsListeners}>
          {(field) => (
            <field.SwitchInput
              label={t("form.options.label")}
              description={t("form.options.description")}
            />
          )}
        </form.AppField>

        <form.Subscribe selector={(s) => s.values.hasVariants}>
          {(hasVariants) => (
            <Collapsible open={hasVariants}>
              <CollapsibleContent>
                <FieldSet className="mx-6 gap-4">
                  <ProductsVariantOptionsSection form={form} v={v} />
                  <ProductsVariantMatrixSection
                    form={form}
                    v={v}
                    imagePreviewById={imagePreviewById}
                  />
                </FieldSet>
              </CollapsibleContent>
            </Collapsible>
          )}
        </form.Subscribe>

        <ProductsVariantDrawers form={form} v={v} />
      </>
    );
  },
});

export function ProductFormVariantsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-full max-w-md" />
        </div>
        <Skeleton className="h-6 w-10 shrink-0 rounded-full" />
      </div>
    </div>
  );
}
