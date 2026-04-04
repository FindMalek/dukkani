"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type ChangeEvent, useCallback, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { Icons } from "./icons";

const triggerVariants = cva(
  "flex shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border-2 border-input border-dashed bg-background text-center transition-colors hover:border-ring/50 hover:bg-accent/40",
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

export type ImageFileTriggerProps = {
  maxFiles: number;
  /** How many images are already in the gallery (used with `append` mode). */
  currentCount: number;
  mode?: "append" | "replace";
  accept?: string;
  /** When false, single selection even if `maxFiles` > 1. */
  multiple?: boolean;
  disabled?: boolean;
  label: string;
  hint: string;
  transformFiles?: (files: File[]) => Promise<File[]>;
  onBusyChange?: (busy: boolean) => void;
  onFilesSelected: (files: File[]) => void;
  className?: string;
} & VariantProps<typeof triggerVariants>;

export function ImageFileTrigger({
  maxFiles,
  currentCount,
  mode = "append",
  accept = "image/*",
  multiple: multipleProp,
  disabled = false,
  label,
  hint,
  transformFiles,
  onBusyChange,
  onFilesSelected,
  variant,
  className,
}: ImageFileTriggerProps) {
  const requestIdRef = useRef(0);
  const [internalBusy, setInternalBusy] = useState(false);
  const busy = disabled || internalBusy;

  const setBusy = useCallback(
    (next: boolean) => {
      setInternalBusy(next);
      onBusyChange?.(next);
    },
    [onBusyChange],
  );

  const multiple = multipleProp ?? maxFiles > 1;

  const processAndEmit = useCallback(
    async (picked: File[]) => {
      if (picked.length === 0) return;

      let slice: File[];
      if (mode === "replace") {
        slice = picked.slice(0, maxFiles);
      } else {
        const room = Math.max(0, maxFiles - currentCount);
        if (room <= 0) return;
        slice = picked.slice(0, room);
      }

      if (slice.length === 0) return;

      const requestId = ++requestIdRef.current;

      if (transformFiles) {
        setBusy(true);
        try {
          let out = await transformFiles(slice);
          if (requestId !== requestIdRef.current) return;
          out = out.filter(Boolean);
          if (mode === "replace") {
            out = out.slice(0, maxFiles);
          } else {
            const roomAfter = Math.max(0, maxFiles - currentCount);
            out = out.slice(0, roomAfter);
          }
          if (out.length > 0) onFilesSelected(out);
        } catch {
          if (requestId !== requestIdRef.current) return;
          const roomAfter = Math.max(0, maxFiles - currentCount);
          const fallback =
            mode === "replace"
              ? slice.slice(0, maxFiles)
              : slice.slice(0, roomAfter);
          if (fallback.length > 0) onFilesSelected(fallback);
        } finally {
          if (requestId === requestIdRef.current) {
            setBusy(false);
          }
        }
        return;
      }

      onFilesSelected(slice);
    },
    [currentCount, maxFiles, mode, onFilesSelected, setBusy, transformFiles],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    e.target.value = "";
    if (!list?.length) return;
    void processAndEmit(Array.from(list));
  };

  if (mode === "append" && currentCount >= maxFiles) {
    return null;
  }

  return (
    <label
      className={cn(
        triggerVariants({ variant }),
        busy && "pointer-events-none opacity-60",
        className,
      )}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        disabled={busy}
        onChange={onChange}
      />
      <Icons.camera className="size-6 text-muted-foreground/60" />
      <span className="px-1 text-center text-[10px] text-muted-foreground leading-tight">
        {label}
      </span>
      <span className="sr-only">{hint}</span>
    </label>
  );
}
