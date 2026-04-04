"use client";

import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Icons } from "./icons";
import { Skeleton } from "./skeleton";

const frameVariants = cva(
  "relative shrink-0 overflow-hidden border border-border bg-muted",
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
  onRemove?: () => void;
  removeAriaLabel?: string;
  className?: string;
} & VariantProps<typeof frameVariants>;

export function ImagePreviewThumb({
  src,
  alt = "",
  onRemove,
  removeAriaLabel = "Remove image",
  variant,
  className,
}: ImagePreviewThumbProps) {
  const frameClass = cn(frameVariants({ variant }), className);
  const unoptimized = Boolean(src?.startsWith("blob:"));

  return (
    <div className={frameClass}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={THUMB_PX}
          height={THUMB_PX}
          unoptimized={unoptimized}
          className="size-full object-cover"
        />
      ) : (
        <Skeleton className="size-full rounded-[inherit]" />
      )}
      {onRemove ? (
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-md"
          onClick={onRemove}
          aria-label={removeAriaLabel}
        >
          <Icons.x className="h-3.5 w-3.5" />
        </Button>
      ) : null}
    </div>
  );
}
