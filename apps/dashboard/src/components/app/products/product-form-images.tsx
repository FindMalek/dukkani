"use client";

import type { ProductImageAttachment } from "@dukkani/common/schemas/product/form";
import {
  Field,
  FieldContent,
  FieldErrors,
  FieldLabel,
} from "@dukkani/ui/components/field";
import { ImageFileTrigger } from "@dukkani/ui/components/image-file-trigger";
import { ImagePreviewStrip } from "@dukkani/ui/components/image-preview-strip";
import { ImagePreviewThumb } from "@dukkani/ui/components/image-preview-thumb";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useTranslations } from "next-intl";
import { useProductFormImagesField } from "@/hooks/use-product-form-images";
import { ProductImagePreviewDialog } from "./product-image-preview-dialog";

function productImageThumbModel(
  item: ProductImageAttachment,
  previewById: Record<string, string>,
): { key: string; src: string | undefined; alt: string } {
  if (item.kind === "remote") {
    return { key: item.url, src: item.url, alt: "" };
  }
  return {
    key: `local-${item.clientId}`,
    src: previewById[item.clientId],
    alt: item.file.name,
  };
}

export function ProductFormImagesSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-24" />
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="size-24 shrink-0 rounded-xl" />
        <Skeleton className="size-24 shrink-0 rounded-xl" />
        <Skeleton className="size-24 shrink-0 rounded-xl border-2 border-muted border-dashed" />
      </div>
    </div>
  );
}

type ProductFormImagesProps = {
  optimizeFiles?: (files: File[]) => Promise<File[]>;
};

export function ProductFormImages({ optimizeFiles }: ProductFormImagesProps) {
  const t = useTranslations("products.create");
  const tFields = useTranslations("fields.images");

  const {
    maxImages,
    attachments,
    previewById,
    thumbsRef,
    isTransforming,
    setIsTransforming,
    fieldErrors,
    isInvalid,
    handleRemove,
    onFilesSelected,
    lightbox,
    openPreview,
    closePreview,
  } = useProductFormImagesField(optimizeFiles);

  return (
    <Field className="min-w-0">
      <FieldContent>
        <FieldLabel>{t("form.photos")}</FieldLabel>
      </FieldContent>
      <div className="flex w-full min-w-0 flex-col gap-3">
        <div className="flex w-full min-w-0 items-center gap-3">
          {attachments.length > 0 && (
            <ImagePreviewStrip thumbsRef={thumbsRef}>
              {attachments.map((item, index) => {
                const thumb = productImageThumbModel(item, previewById);
                const { src, alt } = thumb;
                return (
                  <ImagePreviewThumb
                    key={thumb.key}
                    src={src}
                    alt={alt}
                    onOpenPreview={
                      src ? () => openPreview(src, alt) : undefined
                    }
                    openPreviewAriaLabel={t("form.viewPhoto")}
                    onRemove={() => handleRemove(index)}
                    removeAriaLabel={t("form.removePhoto")}
                  />
                );
              })}
            </ImagePreviewStrip>
          )}

          {attachments.length < maxImages && (
            <ImageFileTrigger
              maxFiles={maxImages}
              currentCount={attachments.length}
              mode="append"
              label={tFields("label")}
              hint={tFields("hint")}
              transformFiles={optimizeFiles}
              onBusyChange={optimizeFiles ? setIsTransforming : undefined}
              onFilesSelected={onFilesSelected}
            />
          )}
        </div>
        {isTransforming ? (
          <div className="flex items-center gap-3">
            <Skeleton className="size-24 shrink-0 rounded-xl" />
          </div>
        ) : null}
      </div>
      <FieldErrors errors={fieldErrors} match={isInvalid} />

      <ProductImagePreviewDialog
        key={lightbox?.src ?? "preview-closed"}
        open={lightbox !== null}
        onOpenChange={(open) => {
          if (!open) closePreview();
        }}
        src={lightbox?.src ?? null}
        alt={lightbox?.alt ?? ""}
      />
    </Field>
  );
}
