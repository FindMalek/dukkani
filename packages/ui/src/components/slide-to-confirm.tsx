"use client";

import type * as React from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { Icons } from "./icons";

/** Past ~82% of handle travel from min width to full track, release confirms. */
const THRESHOLD_RATIO = 0.82;
/** H-9 track, p-0.5 — min drag width, fits icon row. */
const HANDLE_MIN_PX = 40;
const STRIP_COUNT = 8;
/** Left + right track padding (Tailwind p-0.5 → 2px + 2px). */
const PADDING_H_PX = 4;

export interface SlideToConfirmProps {
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  /**
   * Explicit accessible name. When omitted, the text from `children` is exposed
   * (the label layer is not aria-hidden so assistive tech matches the screen).
   */
  "aria-label"?: string;
}

/**
 * Left-anchored growing handle (printer-style) — release past ~82% of max width to confirm.
 * `Enter` / `Space` on the track calls `onConfirm()` when not disabled.
 * Track height is `h-9` to align with `Button` `size="icon"`.
 */
export function SlideToConfirm({
  onConfirm,
  disabled = false,
  className,
  children,
  icon = <Icons.chevronsRight className="size-3.5" />,
  "aria-label": ariaLabel,
}: SlideToConfirmProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const handleWRef = useRef(HANDLE_MIN_PX);
  const [handleW, setHandleW] = useState(HANDLE_MIN_PX);
  const [maxInnerW, setMaxInnerW] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPointerX = useRef<number | null>(null);
  const startW = useRef(HANDLE_MIN_PX);

  const setW = useCallback((v: number) => {
    const clamped = Math.max(HANDLE_MIN_PX, v);
    handleWRef.current = clamped;
    setHandleW(clamped);
  }, []);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const inner = Math.max(0, el.offsetWidth - PADDING_H_PX);
    setMaxInnerW(inner);
    setW(Math.min(handleWRef.current, Math.max(HANDLE_MIN_PX, inner)));
  }, [setW]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !trackRef.current) return;
    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const triggerW =
    maxInnerW > HANDLE_MIN_PX
      ? HANDLE_MIN_PX + (maxInnerW - HANDLE_MIN_PX) * THRESHOLD_RATIO
      : maxInnerW;

  const snapBack = useCallback(() => {
    setW(HANDLE_MIN_PX);
  }, [setW]);

  const endDrag = useCallback(() => {
    if (startPointerX.current === null) return;
    startPointerX.current = null;
    setIsDragging(false);
    const w = handleWRef.current;
    if (maxInnerW > 0 && w >= triggerW) {
      onConfirm();
    }
    snapBack();
  }, [maxInnerW, onConfirm, snapBack, triggerW]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.preventDefault();
      startPointerX.current = e.clientX;
      startW.current = handleWRef.current;
      setIsDragging(true);
    },
    [disabled],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (
        startPointerX.current === null ||
        disabled ||
        maxInnerW < HANDLE_MIN_PX
      ) {
        return;
      }
      const delta = e.clientX - startPointerX.current;
      const next = startW.current + delta;
      const cap = maxInnerW;
      setW(Math.min(cap, Math.max(HANDLE_MIN_PX, next)));
    },
    [disabled, maxInnerW, setW],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      endDrag();
    },
    [endDrag],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      startPointerX.current = null;
      setIsDragging(false);
      snapBack();
    },
    [snapBack],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onConfirm();
      }
    },
    [disabled, onConfirm],
  );

  const coverRatio =
    maxInnerW > 0
      ? Math.min(
          1,
          (handleW - HANDLE_MIN_PX) / (maxInnerW - HANDLE_MIN_PX || 1),
        )
      : 0;
  const labelOpacity = Math.max(0.12, 1 - coverRatio * 1.15);

  return (
    <div
      className={cn(
        "relative w-full",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <div
        ref={trackRef}
        data-slot="slide-to-confirm-track"
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className="relative h-9 w-full min-w-0 select-none overflow-hidden rounded-full border border-primary/25 bg-primary p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {children && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-1.5"
            style={{ opacity: labelOpacity }}
          >
            <span className="line-clamp-1 text-center font-medium text-primary-foreground text-xs sm:text-sm">
              {children}
            </span>
          </div>
        )}
        <div
          role="presentation"
          className={cn(
            "absolute top-0.5 bottom-0.5 left-0.5 z-10 flex min-h-0 min-w-0 touch-none items-stretch overflow-hidden rounded-full border border-primary-foreground/35 bg-primary-foreground/20 shadow-sm backdrop-blur-sm",
            "cursor-grab active:cursor-grabbing",
            !isDragging && "transition-[width] duration-200 ease-out",
            disabled && "pointer-events-none",
          )}
          style={{
            width: handleW,
            minWidth: HANDLE_MIN_PX,
            maxWidth: maxInnerW > 0 ? maxInnerW : undefined,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div
            className="flex h-full min-w-0 items-center justify-start gap-px pr-0.5 pl-1"
            aria-hidden
          >
            {Array.from({ length: STRIP_COUNT }).map((_, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 text-primary-foreground/90"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
