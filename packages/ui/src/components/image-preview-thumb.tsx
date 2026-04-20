"use client";

import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Icons } from "./icons";
import { Skeleton } from "./skeleton";

const frameVariants = cva(
  "relative isolate shrink-0 overflow-hidden border border-border bg-muted",
  {
    variants: {
      variant: {
        default: "size-24 rounded-xl",
        avatar: "size-24 rounded-full",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const THUMB_PX = 96;

export type ImagePreviewThumbProps = {
  src?: string;
  alt?: string;
  /** Opens a larger preview (e.g. dialog); only used when `src` is set. */
  onOpenPreview?: () => void;
  openPreviewAriaLabel?: string;
  onRemove?: () => void;
  removeAriaLabel?: string;
  className?: string;
} & VariantProps<typeof frameVariants>;

export function ImagePreviewThumb({
  src,
  alt = "",
  onOpenPreview,
  openPreviewAriaLabel = "View full size",
  onRemove,
  removeAriaLabel = "Remove image",
  variant,
  className,
}: ImagePreviewThumbProps) {
  const frameClass = cn(frameVariants({ variant }), className);
  const unoptimized = Boolean(src?.startsWith("blob:"));

  const imageEl = src ? (
    <Image
      src={src}
      alt={alt}
      width={THUMB_PX}
      height={THUMB_PX}
      unoptimized={unoptimized}
      className="pointer-events-none size-full object-cover"
    />
  ) : (
    <Skeleton className="size-full rounded-[inherit]" />
  );

  return (
    <div className={frameClass}>
      {src && onOpenPreview ? (
        <button
          type="button"
          className="absolute inset-0 flex size-full cursor-zoom-in items-center justify-center rounded-[inherit] border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={onOpenPreview}
          aria-label={openPreviewAriaLabel}
        >
          {imageEl}
        </button>
      ) : (
        imageEl
      )}
      {onRemove ? (
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute -top-2 -right-2 z-10 h-7 w-7 rounded-full shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={removeAriaLabel}
        >
          <Icons.x className="h-3.5 w-3.5" />
        </Button>
      ) : null}
    </div>
  );
}
