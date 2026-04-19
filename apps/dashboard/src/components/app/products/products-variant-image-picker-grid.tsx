"use client";

import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useObjectUrlPreviews } from "@dukkani/ui/hooks/use-object-url-previews";
import { cn } from "@dukkani/ui/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { productImageAttachmentThumb } from "@/shared/lib/variant/variants-form.util";

type LocalAttachment = Extract<
  ProductFormInput["images"][number],
  { kind: "local" }
>;

export function ImagePickerGrid({
  images,
  selectedRef,
  onSelect,
}: {
  images: ProductFormInput["images"];
  selectedRef: string | undefined;
  onSelect: (ref: string | undefined) => void;
}) {
  const t = useTranslations("products.create");

  const localPreviewItems = useMemo(
    () =>
      images
        .filter((a): a is LocalAttachment => a.kind === "local")
        .map((a) => ({ id: a.clientId, file: a.file })),
    [images],
  );
  const previewById = useObjectUrlPreviews(localPreviewItems);

  return (
    <div className="grid grid-cols-4 gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => onSelect(undefined)}
        className={cn(
          "aspect-square h-auto min-h-0 w-full flex-col gap-0 p-0",
          !selectedRef ? "border-primary" : "border-border",
        )}
      >
        <Icons.imageOff className="h-5 w-5 text-muted-foreground" />
        <span className="sr-only">
          {t("form.variants.imagePicker.noImage")}
        </span>
      </Button>
      {images.map((img) => {
        const thumb = productImageAttachmentThumb(img, previewById);
        const isSelected = selectedRef === thumb.ref;
        return (
          <Button
            key={thumb.ref}
            type="button"
            variant="outline"
            onClick={() => onSelect(thumb.ref)}
            className={cn(
              "relative aspect-square h-auto min-h-0 w-full overflow-hidden p-0",
              isSelected ? "border-primary" : "border-border",
            )}
          >
            {thumb.src ? (
              <Image
                src={thumb.src}
                alt={thumb.alt}
                fill
                className="object-cover"
                sizes="96px"
                unoptimized
              />
            ) : img.kind === "local" ? (
              <Skeleton className="absolute inset-0 rounded-none" />
            ) : (
              <div className="absolute inset-0 bg-muted" aria-hidden />
            )}
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                <Icons.check className="h-5 w-5 text-background drop-shadow-sm" />
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
}
