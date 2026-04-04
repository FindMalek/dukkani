"use client";

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
    <Field>
      <FieldContent>
        <FieldLabel>{t("form.photos")}</FieldLabel>
      </FieldContent>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {attachments.length > 0 && (
            <ImagePreviewStrip thumbsRef={thumbsRef}>
              {attachments.map((item, index) => {
                const resolvedSrc =
                  item.kind === "remote"
                    ? item.url
                    : previewById[item.clientId];

                return (
                  <ImagePreviewThumb
                    key={
                      item.kind === "remote"
                        ? item.url
                        : `local-${item.clientId}`
                    }
                    src={resolvedSrc}
                    alt={item.kind === "remote" ? "" : item.file.name}
                    onOpenPreview={
                      resolvedSrc
                        ? () =>
                            openPreview(
                              resolvedSrc,
                              item.kind === "remote" ? "" : item.file.name,
                            )
                        : undefined
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
