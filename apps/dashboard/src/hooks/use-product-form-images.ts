"use client";

import type { ProductImageAttachment } from "@dukkani/common/schemas/product/form";
import { useFieldContext } from "@dukkani/ui/hooks/use-app-form";
import { useObjectUrlPreviews } from "@dukkani/ui/hooks/use-object-url-previews";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { productFormConstants } from "@/shared/config/constants";

export type ProductFormImagesLightbox = {
  src: string;
  alt: string;
};

/**
 * Field logic for product photos (remote + local attachments, blob previews, add/remove, lightbox).
 * Must run under `AppField name="images"` (see `ProductFormImages`).
 */
export function useProductFormImagesField(
  optimizeFiles?: (files: File[]) => Promise<File[]>,
) {
  const field = useFieldContext<ProductImageAttachment[]>();

  const thumbsRef = useRef<HTMLDivElement>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [lightbox, setLightbox] = useState<ProductFormImagesLightbox | null>(
    null,
  );

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

  const handleRemove = useCallback(
    (index: number) => {
      const next = attachments.filter((_, i) => i !== index);
      field.handleChange(next);
      field.handleBlur();
    },
    [attachments, field],
  );

  const onFilesSelected = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;

      const latest = attachmentsRef.current;
      const space = productFormConstants.MAX_IMAGES - latest.length;
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

  const openPreview = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  const closePreview = useCallback(() => {
    setLightbox(null);
  }, []);

  return {
    maxImages: productFormConstants.MAX_IMAGES,
    attachments,
    previewById,
    thumbsRef,
    isTransforming,
    setIsTransforming,
    fieldErrors: field.state.meta.errors,
    isInvalid,
    handleRemove,
    onFilesSelected,
    lightbox,
    openPreview,
    closePreview,
  };
}
