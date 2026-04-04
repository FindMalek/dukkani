"use client";

import { FieldGroup, FieldSet } from "@dukkani/ui/components/field";
import { ProductFormActionsSkeleton } from "./product-form-actions";
import { ProductFormEssentialsSkeleton } from "./product-form-essentials";
import { ProductFormVariantsSkeleton } from "./product-form-variants";

type ProductFormSkeletonProps = {
  loadingLabel: string;
};

/**
 * Composes colocated section skeletons in the same order as {@link ProductForm}.
 */
export function ProductFormSkeleton({
  loadingLabel,
}: ProductFormSkeletonProps) {
  return (
    <div
      className="flex flex-col gap-4 px-2 pb-24"
      role="status"
      aria-busy
      aria-label={loadingLabel}
    >
      <FieldGroup>
        <FieldSet>
          <FieldGroup className="gap-6">
            <ProductFormEssentialsSkeleton />
            <ProductFormVariantsSkeleton />
            <ProductFormActionsSkeleton />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <span className="sr-only">{loadingLabel}</span>
    </div>
  );
}
