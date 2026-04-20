"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { cn } from "../lib/utils";
import {
  ImageFileTrigger,
  type ImageFileTriggerProps,
} from "./image-file-trigger";
import { ImagePreviewStrip } from "./image-preview-strip";
import { ImagePreviewThumb } from "./image-preview-thumb";
import { Skeleton } from "./skeleton";

export type ImageUploadRowItem = {
  id: string;
  src?: string;
  alt?: string;
  onRemove?: () => void;
};

export type ImageUploadRowProps = {
  items: ImageUploadRowItem[];
  maxFiles: number;
  mode?: ImageFileTriggerProps["mode"];
  transformFiles?: ImageFileTriggerProps["transformFiles"];
  onBusyChange?: ImageFileTriggerProps["onBusyChange"];
  onFilesSelected: ImageFileTriggerProps["onFilesSelected"];
  label: string;
  hint: string;
  removeAriaLabel?: string;
  disabled?: boolean;
  variant?: ImageFileTriggerProps["variant"];
  scrollAreaClassName?: string;
  /** Extra skeleton row while transforming (e.g. below the strip). */
  showOptimizingSkeleton?: boolean;
  className?: string;
};

export function ImageUploadRow({
  items,
  maxFiles,
  mode = "append",
  transformFiles,
  onBusyChange,
  onFilesSelected,
  label,
  hint,
  removeAriaLabel = "Remove image",
  disabled,
  variant,
  scrollAreaClassName,
  showOptimizingSkeleton,
  className,
}: ImageUploadRowProps) {
  const thumbsRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useEffectEvent(() => {
    const viewport = thumbsRef.current?.closest(
      "[data-radix-scroll-area-viewport]",
    );
    if (viewport) viewport.scrollLeft = viewport.scrollWidth;
  });

  useEffect(() => {
    if (items.length > 0) {
      scrollToEnd();
    }
  }, [items.length]);

  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-3", className)}>
      <div className="flex w-full min-w-0 items-center gap-3">
        {items.length > 0 && (
          <ImagePreviewStrip
            thumbsRef={thumbsRef}
            scrollAreaClassName={scrollAreaClassName}
          >
            {items.map((item) => (
              <ImagePreviewThumb
                key={item.id}
                src={item.src}
                alt={item.alt}
                variant={variant}
                onRemove={item.onRemove}
                removeAriaLabel={removeAriaLabel}
              />
            ))}
          </ImagePreviewStrip>
        )}

        <ImageFileTrigger
          maxFiles={maxFiles}
          currentCount={items.length}
          mode={mode}
          variant={variant}
          disabled={disabled}
          label={label}
          hint={hint}
          transformFiles={transformFiles}
          onBusyChange={onBusyChange}
          onFilesSelected={onFilesSelected}
        />
      </div>
      {showOptimizingSkeleton ? (
        <div className="flex items-center gap-3">
          <Skeleton className="size-24 shrink-0 rounded-xl" />
        </div>
      ) : null}
    </div>
  );
}
