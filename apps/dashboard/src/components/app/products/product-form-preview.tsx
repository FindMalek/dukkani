"use client";

import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import { SafeMarkdown } from "@dukkani/ui/components/markdown/safe-markdown";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { useFormatPriceCurrentStore } from "@dukkani/ui/hooks/use-format-price";
import { useObjectUrlPreviews } from "@dukkani/ui/hooks/use-object-url-previews";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { ProductFormPreviewCarousel } from "@/components/app/products/product-form-preview-carousel";
import { productFormOptions } from "@/shared/lib/product/form";
import { useCurrentStoreCurrency } from "@/shared/lib/store/current-currency.hook";
import { productImageAttachmentThumb } from "@/shared/lib/variant/variants-form.util";

type PreviewSnapshot = Pick<
  ProductFormInput,
  | "name"
  | "description"
  | "price"
  | "hasVariants"
  | "images"
  | "variants"
  | "variantOptions"
>;

type ImageAttachment = ProductFormInput["images"][number];

/** A displayable preview image, keeping the same `ref` identity `variants[].imageRef` points at. */
type ResolvedPreviewImage = { ref: string; src: string };

/**
 * Resolves the ordered, displayable image list from form-watched attachments
 * (remote URLs and local blob previews), preserving attachment order. Local
 * attachments without a resolved blob preview yet (or malformed remote
 * entries) are skipped rather than rendered as a broken slide.
 */
function useResolvedImages(
  images: ProductFormInput["images"],
): ResolvedPreviewImage[] {
  const localItems = useMemo(
    () =>
      images
        .filter(
          (item): item is Extract<ImageAttachment, { kind: "local" }> =>
            item.kind === "local",
        )
        .map((item) => ({ id: item.clientId, file: item.file })),
    [images],
  );
  const previewById = useObjectUrlPreviews(localItems);

  return useMemo(() => {
    const resolved: ResolvedPreviewImage[] = [];
    for (const image of images) {
      const thumb = productImageAttachmentThumb(image, previewById);
      if (thumb.src) resolved.push({ ref: thumb.ref, src: thumb.src });
    }
    return resolved;
  }, [images, previewById]);
}

/**
 * Finds the `imageRef` of the variant row matching the currently selected
 * swatch options — mirroring the storefront's `findMatchingVariant`
 * (`apps/storefront/src/components/shared/variant-selector.tsx`), which
 * requires every option to match exactly (no partial matches). Missing
 * selections fall back to each option's first value, matching
 * `ProductPreviewSwatches`' own default-selection display logic.
 */
function useSelectedVariantImageRef(
  variants: PreviewSnapshot["variants"],
  variantOptions: PreviewSnapshot["variantOptions"],
  selectedOptions: Record<string, string>,
): string | undefined {
  return useMemo(() => {
    const validOptions = variantOptions.filter(
      (option) => option.name.trim().length > 0 && option.values.length > 0,
    );
    if (validOptions.length === 0) return undefined;

    const effectiveSelections: Record<string, string> = {};
    for (const option of validOptions) {
      const value = selectedOptions[option.name] ?? option.values[0]?.value;
      if (value) effectiveSelections[option.name] = value;
    }

    const effectiveKeys = Object.keys(effectiveSelections);
    if (effectiveKeys.length === 0) return undefined;

    const match = variants.find((variant) => {
      const variantKeys = Object.keys(variant.selections);
      if (variantKeys.length !== effectiveKeys.length) return false;
      return effectiveKeys.every(
        (key) => variant.selections[key] === effectiveSelections[key],
      );
    });

    return match?.imageRef;
  }, [variants, variantOptions, selectedOptions]);
}

/** Formats a price label for the preview, computing a range across variant prices when applicable. */
function usePriceLabel(
  snapshot: PreviewSnapshot,
  formatPrice: (v: number) => string,
) {
  return useMemo(() => {
    if (!snapshot.hasVariants) {
      const price = Number(snapshot.price);
      if (!Number.isFinite(price) || price <= 0) return undefined;
      return formatPrice(price);
    }

    const basePrice = Number(snapshot.price);
    const resolvedPrices = snapshot.variants
      .map((variant) => {
        if (variant.price !== undefined && variant.price !== null) {
          const parsed = Number(variant.price);
          return Number.isFinite(parsed) ? parsed : undefined;
        }
        return Number.isFinite(basePrice) && basePrice > 0
          ? basePrice
          : undefined;
      })
      .filter((value): value is number => value !== undefined);

    if (resolvedPrices.length === 0) return undefined;

    const min = Math.min(...resolvedPrices);
    const max = Math.max(...resolvedPrices);
    return min === max
      ? formatPrice(min)
      : `${formatPrice(min)} – ${formatPrice(max)}`;
  }, [snapshot.hasVariants, snapshot.price, snapshot.variants, formatPrice]);
}

function ProductPreviewSwatches({
  variantOptions,
  selectedOptions,
  onSelectValue,
}: {
  variantOptions: ProductFormInput["variantOptions"];
  selectedOptions: Record<string, string>;
  onSelectValue: (optionName: string, value: string) => void;
}) {
  const validOptions = variantOptions.filter(
    (option) => option.name.trim().length > 0 && option.values.length > 0,
  );

  if (validOptions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {validOptions.map((option) => (
        <div key={option.name} className="flex flex-col gap-1">
          <span className="font-medium text-muted-foreground text-xs">
            {option.name}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {option.values.map((value) => {
              const isSelected =
                (selectedOptions[option.name] ?? option.values[0]?.value) ===
                value.value;
              return (
                <button
                  key={value.value}
                  type="button"
                  onClick={() => onSelectValue(option.name, value.value)}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {value.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductPreviewCard({ snapshot }: { snapshot: PreviewSnapshot }) {
  const t = useTranslations("products.create.preview");
  const currency = useCurrentStoreCurrency();
  const formatPrice = useFormatPriceCurrentStore(currency);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const resolvedImages = useResolvedImages(snapshot.images);
  const selectedVariantImageRef = useSelectedVariantImageRef(
    snapshot.variants,
    snapshot.variantOptions,
    selectedOptions,
  );
  const targetSlideIndex = useMemo(() => {
    if (!selectedVariantImageRef) return null;
    const idx = resolvedImages.findIndex(
      (image) => image.ref === selectedVariantImageRef,
    );
    return idx >= 0 ? idx : null;
  }, [resolvedImages, selectedVariantImageRef]);

  const priceLabel = usePriceLabel(snapshot, (v) => formatPrice(v));
  const displayName =
    snapshot.name.trim().length > 0 ? snapshot.name : t("untitled");

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
        {t("title")}
      </p>
      <ProductFormPreviewCarousel
        images={resolvedImages.map((image) => image.src)}
        productName={displayName}
        targetSlideIndex={targetSlideIndex}
      />
      <div className="flex flex-col gap-1">
        <h3
          className={`font-bold text-sm ${
            snapshot.name.trim().length === 0
              ? "text-muted-foreground italic"
              : "text-foreground"
          }`}
        >
          {displayName}
        </h3>
        {priceLabel ? (
          <p className="text-muted-foreground text-sm tabular-nums" dir="ltr">
            {priceLabel}
          </p>
        ) : (
          <Skeleton className="h-4 w-16" />
        )}
      </div>
      <ProductPreviewSwatches
        variantOptions={snapshot.variantOptions}
        selectedOptions={selectedOptions}
        onSelectValue={(optionName, value) =>
          setSelectedOptions((prev) => ({ ...prev, [optionName]: value }))
        }
      />
      {snapshot.description?.trim() ? (
        <div className="flex flex-col gap-1 border-t pt-3">
          <p className="font-medium text-muted-foreground text-xs">
            {t("description")}
          </p>
          <SafeMarkdown className="prose prose-sm max-w-none text-foreground text-sm leading-relaxed">
            {snapshot.description}
          </SafeMarkdown>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Sticky, read-only live preview of the product being edited — mirrors the storefront's
 * card/PDP visual treatment. Purely derived from `productFormOptions` watched values via
 * `form.Subscribe`; no network calls, no duplicated form state.
 */
export const ProductFormPreview = withForm({
  ...productFormOptions,
  props: {},
  render: function Render({ form }) {
    return (
      <form.Subscribe
        selector={(s) => ({
          name: s.values.name,
          description: s.values.description,
          price: s.values.price,
          hasVariants: s.values.hasVariants,
          images: s.values.images,
          variants: s.values.variants,
          variantOptions: s.values.variantOptions,
        })}
      >
        {(snapshot) => <ProductPreviewCard snapshot={snapshot} />}
      </form.Subscribe>
    );
  },
});
