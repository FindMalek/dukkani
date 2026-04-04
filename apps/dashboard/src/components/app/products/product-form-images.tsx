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
              {attachments.map((item, index) => (
                <ImagePreviewThumb
                  key={
                    item.kind === "remote" ? item.url : `local-${item.clientId}`
                  }
                  src={
                    item.kind === "remote"
                      ? item.url
                      : previewById[item.clientId]
                  }
                  alt={item.kind === "remote" ? "" : item.file.name}
                  onRemove={() => handleRemove(index)}
                  removeAriaLabel={t("form.removePhoto")}
                />
              ))}
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
    </Field>
  );
}
