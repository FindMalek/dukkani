"use client";

import { Button } from "@dukkani/ui/components/button";
import { ButtonGroup } from "@dukkani/ui/components/button-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@dukkani/ui/components/dialog";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { cn } from "@dukkani/ui/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PLACEHOLDER_W = 1600;
const PLACEHOLDER_H = 1200;

const MIN_SCALE = 0.25;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.25;

type ProductImagePreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string | null;
  alt: string;
};

export function ProductImagePreviewDialog({
  open,
  onOpenChange,
  src,
  alt,
}: ProductImagePreviewDialogProps) {
  const t = useTranslations("products.create");

  const scrollRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    if (!open) {
      setScale(1);
    }
  }, [open]);

  const clampScale = useCallback(
    (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s)),
    [],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!open || !el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP * 0.5 : ZOOM_STEP * 0.5;
      setScale((s) => clampScale(s + delta));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, clampScale]);

  const zoomIn = () => setScale((s) => clampScale(s + ZOOM_STEP));
  const zoomOut = () => setScale((s) => clampScale(s - ZOOM_STEP));
  const resetZoom = () => setScale(1);

  const { width, height } = useMemo(() => {
    if (!natural) {
      return { width: PLACEHOLDER_W, height: PLACEHOLDER_H };
    }
    return {
      width: Math.max(1, Math.round(natural.w * scale)),
      height: Math.max(1, Math.round(natural.h * scale)),
    };
  }, [natural, scale]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed inset-0 top-0 left-0 z-50 flex h-dvh max-h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-background p-0 shadow-none duration-200 sm:max-w-none",
        )}
      >
        <DialogDescription className="sr-only">
          {t("form.photoPreviewWheelHint")}
        </DialogDescription>
        <div className="flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-4">
          <DialogTitle className="truncate font-semibold text-base">
            {t("form.photoPreviewTitle")}
          </DialogTitle>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <span
              className="hidden max-w-40 truncate text-muted-foreground text-xs sm:inline"
              title={t("form.photoPreviewWheelHint")}
            >
              {t("form.photoPreviewWheelHint")}
            </span>
            <ButtonGroup
              className="shrink-0"
              aria-label={t("form.photoPreviewZoomGroup")}
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={t("form.photoPreviewZoomOut")}
                onClick={zoomOut}
              >
                <Icons.minus />
              </Button>
              <Input
                readOnly
                tabIndex={-1}
                value={`${Math.round(scale * 100)}%`}
                aria-label={t("form.photoPreviewZoomReadout")}
                aria-live="polite"
                className="w-20 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={t("form.photoPreviewZoomIn")}
                onClick={zoomIn}
              >
                <Icons.plus />
              </Button>
            </ButtonGroup>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0"
                aria-label={t("form.photoPreviewClose")}
              >
                <Icons.x />
              </Button>
            </DialogClose>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
        >
          <div className="flex min-h-full min-w-full items-center justify-center p-4 sm:p-6">
            {src ? (
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                unoptimized
                onLoad={(e) => {
                  const img = e.currentTarget;
                  setNatural({ w: img.naturalWidth, h: img.naturalHeight });
                }}
                onDoubleClick={resetZoom}
                style={
                  natural
                    ? {
                        width: `${width}px`,
                        height: `${height}px`,
                        maxWidth: "none",
                        maxHeight: "none",
                      }
                    : {
                        maxWidth: "100%",
                        width: "auto",
                        height: "auto",
                        maxHeight: "min(85dvh, 900px)",
                      }
                }
                className={cn(
                  "select-none object-contain",
                  natural && "max-w-none shrink-0 grow-0",
                  !natural && "max-w-full",
                )}
                draggable={false}
              />
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
