"use client";

import type { ProductImageAttachment } from "@dukkani/common/schemas/product/form";
import { Button } from "@dukkani/ui/components/button";
import {
  Field,
  FieldContent,
  FieldErrors,
  FieldLabel,
} from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { ScrollArea, ScrollBar } from "@dukkani/ui/components/scroll-area";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useFieldContext } from "@dukkani/ui/hooks/use-app-form";
import { cn } from "@dukkani/ui/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

const MAX_IMAGES = 10;

function useLocalPreviewUrls(attachments: ProductImageAttachment[]) {
  const [previewById, setPreviewById] = useState<Record<string, string>>({});
  const previewsRef = useRef(previewById);
  previewsRef.current = previewById;

  useEffect(() => {
    const locals = attachments.filter(
      (a): a is Extract<ProductImageAttachment, { kind: "local" }> =>
        a.kind === "local",
    );

    setPreviewById((prev) => {
      const next: Record<string, string> = {};
      for (const l of locals) {
        next[l.clientId] = prev[l.clientId] ?? URL.createObjectURL(l.file);
      }
      for (const id of Object.keys(prev)) {
        if (!(id in next)) {
          URL.revokeObjectURL(prev[id]!);
        }
      }
      return next;
    });
  }, [attachments]);

  useEffect(
    () => () => {
      for (const url of Object.values(previewsRef.current)) {
        URL.revokeObjectURL(url);
      }
    },
    [],
  );

  return previewById;
}

type ProductFormImagesProps = {
  optimizeFiles?: (files: File[]) => Promise<File[]>;
};

export function ProductFormImages({ optimizeFiles }: ProductFormImagesProps) {
  const t = useTranslations("products.create");
  const tFields = useTranslations("fields.images");

  const optimizationRequestRef = useRef(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const field = useFieldContext<ProductImageAttachment[]>();

  const attachments = field.state.value ?? [];

  const attachmentsRef = useRef(attachments);
  const previewById = useLocalPreviewUrls(attachments);

  attachmentsRef.current = attachments;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

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

  const addFiles = useCallback(
    async (incoming: File[]) => {
      if (incoming.length === 0) return;

      const current = attachmentsRef.current;
      const room = MAX_IMAGES - current.length;
      if (room <= 0) return;

      const requestId = ++optimizationRequestRef.current;
      let toAdd = incoming.slice(0, room);

      if (optimizeFiles) {
        setIsOptimizing(true);
        try {
          toAdd = await optimizeFiles(toAdd);
          if (requestId !== optimizationRequestRef.current) {
            return;
          }
          toAdd = toAdd.filter(Boolean).slice(0, room);
        } catch {
          if (requestId !== optimizationRequestRef.current) {
            return;
          }
          toAdd = incoming.slice(0, room);
        } finally {
          if (requestId === optimizationRequestRef.current) {
            setIsOptimizing(false);
          }
        }
      }

      if (toAdd.length === 0) return;

      const newLocals: ProductImageAttachment[] = toAdd.map((file) => ({
        kind: "local",
        file,
        clientId: crypto.randomUUID(),
      }));

      const latest = attachmentsRef.current;
      const space = MAX_IMAGES - latest.length;
      if (space <= 0) return;

      field.handleChange([...latest, ...newLocals.slice(0, space)]);
      field.handleBlur();
    },
    [field, optimizeFiles],
  );

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    e.target.value = "";
    if (!list?.length) return;
    void addFiles(Array.from(list));
  };

  return (
    <Field>
      <FieldContent>
        <FieldLabel>{t("form.photos")}</FieldLabel>
      </FieldContent>
      <div className="flex items-center gap-3">
        {attachments.length > 0 && (
          <ScrollArea className="max-w-sm">
            <div className="flex gap-3" ref={thumbsRef}>
              {attachments.map((item, index) => {
                const localPreview =
                  item.kind === "local"
                    ? previewById[item.clientId]
                    : undefined;

                return (
                  <div
                    key={
                      item.kind === "remote"
                        ? item.url
                        : `local-${item.clientId}`
                    }
                    className="relative shrink-0"
                  >
                    {item.kind === "remote" ? (
                      <Image
                        src={item.url}
                        alt={item.url}
                        width={96}
                        height={96}
                        className="size-24 rounded-xl border border-border object-cover"
                      />
                    ) : localPreview ? (
                      <Image
                        src={localPreview}
                        alt={item.file.name}
                        width={96}
                        height={96}
                        unoptimized
                        className="size-24 rounded-xl border border-border object-cover"
                      />
                    ) : (
                      <Skeleton className="size-24 shrink-0 rounded-xl border border-border" />
                    )}
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-md"
                      onClick={() => handleRemove(index)}
                      aria-label={t("form.removePhoto")}
                    >
                      <Icons.x className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {attachments.length < MAX_IMAGES && (
          <label
            className={cn(
              "flex size-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-input border-dashed bg-background text-center transition-colors",
              "hover:border-ring/50 hover:bg-accent/40",
              isOptimizing && "pointer-events-none opacity-60",
            )}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={onFileInputChange}
            />
            <Icons.camera className="size-6 text-muted-foreground/60" />
            <span className="px-1 text-center text-[10px] text-muted-foreground leading-tight">
              {tFields("label")}
            </span>
            <span className="sr-only">{tFields("hint")}</span>
          </label>
        )}
      </div>
      {isOptimizing ? (
        <div className="flex items-center gap-3 pt-1">
          <Skeleton className="size-24 shrink-0 rounded-xl" />
        </div>
      ) : null}
      <FieldErrors errors={field.state.meta.errors} match={isInvalid} />
    </Field>
  );
}
