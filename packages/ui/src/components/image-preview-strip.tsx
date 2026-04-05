"use client";

import type * as React from "react";
import { cn } from "../lib/utils";
import { ScrollArea, ScrollBar } from "./scroll-area";

type ImagePreviewStripProps = {
  children: React.ReactNode;
  thumbsRef?: React.RefObject<HTMLDivElement | null>;
  scrollAreaClassName?: string;
  className?: string;
};

export function ImagePreviewStrip({
  children,
  thumbsRef,
  scrollAreaClassName,
  className,
}: ImagePreviewStripProps) {
  return (
    <ScrollArea
      className={cn("min-w-0 flex-1 max-w-full basis-0", scrollAreaClassName)}
    >
      <div className={cn("flex w-max gap-3", className)} ref={thumbsRef}>
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
