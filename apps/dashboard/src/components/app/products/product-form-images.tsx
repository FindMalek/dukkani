"use client";

import type { ProductImageAttachment } from "@dukkani/common/schemas/product/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@dukkani/ui/components/dialog";
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
import { useFieldContext } from "@dukkani/ui/hooks/use-app-form";
import { useObjectUrlPreviews } from "@dukkani/ui/hooks/use-object-url-previews";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";

const MAX_IMAGES = 10;

type ProductFormImagesProps = {
  optimizeFiles?: (files: File[]) => Promise<File[]>;
};

export function ProductFormImages({ optimizeFiles }: ProductFormImagesProps) {
  const t = useTranslations("products.create");
  const tFields = useTranslations("fields.images");

  const thumbsRef = useRef<HTMLDivElement>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const field = useFieldContext<ProductImageAttachment[]>();

  const attachments = field.state.value ?? [];

  const attachmentsRef = useRef(attachments);
  attachmentsRef.current = attachments;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const localPreviewItems = useMemo(
    () =>
      attachments
        .filter(
          (a): a is Extract<ProductImageAttachment, { kind: "local" }> =>
            a.kind === "local",
        )
        .map((a) => ({ id: a.clientId, file: a.file })),
    [attachments],
  );

  const previewById = useObjectUrlPreviews(localPreviewItems);

  const scrollToEnd = useEffectEvent(() => {
    const viewport = thumbsRef.current?.closest(
      "[data-radix-scroll-area-viewport]",
    );
    if (viewport) viewport.scrollLeft = viewport.scrollWidth;
  });

  useEffect(() => {
    if (attachments.length > 0) {
      scrollToEnd();
    }
  }, [attachments.length]);

  const handleRemove = (index: number) => {
    const next = attachments.filter((_, i) => i !== index);
    field.handleChange(next);
    field.handleBlur();
  };

  const onFilesSelected = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;

      const latest = attachmentsRef.current;
      const space = MAX_IMAGES - latest.length;
      if (space <= 0) return;

      const toAdd = files.slice(0, space);
      field.handleChange([
        ...latest,
        ...toAdd.map((file) => ({
          kind: "local" as const,
          file,
          clientId: crypto.randomUUID(),
        })),
      ]);
      field.handleBlur();
    },
    [field],
  );

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
                            setLightbox({
                              src: resolvedSrc,
                              alt: item.kind === "remote" ? "" : item.file.name,
                            })
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

          {attachments.length < MAX_IMAGES && (
            <ImageFileTrigger
              maxFiles={MAX_IMAGES}
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
      <FieldErrors errors={field.state.meta.errors} match={isInvalid} />

      <Dialog
        open={lightbox !== null}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent className="max-w-[min(90vw,56rem)] gap-4 p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>{t("form.photoPreviewTitle")}</DialogTitle>
          </DialogHeader>
          <div className="flex max-h-[85vh] w-full items-center justify-center overflow-auto rounded-md bg-muted p-2">
            {lightbox?.src ? (
              // Large arbitrary URLs (remote + blob): native img avoids Next image layout constraints.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[min(80vh,900px)] w-auto max-w-full object-contain"
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </Field>
  );
}
