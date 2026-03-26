"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Dropzone, DropzoneThumb, DropzoneZone } from "../dropzone";
import { ScrollArea, ScrollBar } from "../scroll-area";
import { Skeleton } from "../skeleton";
import { BaseField, type CommonFieldProps } from "./base-field";

interface ImagesFieldProps extends CommonFieldProps {
  multiple?: boolean;
  optimizeFiles?: (files: File[]) => Promise<File[]>;
}

export function ImagesField({
  label,
  description,
  srOnlyLabel,
  multiple = true,
  optimizeFiles,
}: ImagesFieldProps) {
  const field = useFieldContext<File[]>();
  const files = field.state.value ?? [];
  const t = useTranslations("fields.images");
  const thumbsRef = React.useRef<HTMLDivElement>(null);
  const optimizationRequestRef = React.useRef(0);
  const [isOptimizing, setIsOptimizing] = React.useState(false);

  const scrollToEnd = React.useEffectEvent(() => {
    const viewport = thumbsRef.current?.closest(
      "[data-radix-scroll-area-viewport]",
    );
    if (viewport) viewport.scrollLeft = viewport.scrollWidth;
  });

  React.useEffect(() => {
    if (files.length > 0) {
      scrollToEnd();
    }
  }, [files.length]);

  const handleFilesChange = React.useCallback(
    async (next: { file: File; preview: string }[]) => {
      const requestId = ++optimizationRequestRef.current;
      const nextFiles = next.map((fileWithPreview) => fileWithPreview.file);

      if (!optimizeFiles) {
        field.handleChange(nextFiles);
        field.handleBlur();
        return;
      }

      setIsOptimizing(true);

      try {
        const optimizedFiles = await optimizeFiles(nextFiles);
        if (requestId !== optimizationRequestRef.current) {
          return;
        }
        field.handleChange(optimizedFiles.filter(Boolean));
      } catch {
        if (requestId !== optimizationRequestRef.current) {
          return;
        }
        field.handleChange(nextFiles);
      } finally {
        if (requestId === optimizationRequestRef.current) {
          setIsOptimizing(false);
          field.handleBlur();
        }
      }
    },
    [field, optimizeFiles],
  );

  return (
    <BaseField
      label={label}
      description={description}
      srOnlyLabel={srOnlyLabel}
    >
      <Dropzone
        className="w-full"
        accept={{ "image/*": [] }}
        multiple={multiple}
        files={files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }))}
        onFilesChange={handleFilesChange}
      >
        <div className="flex items-center gap-3">
          {files.length > 0 && (
            <ScrollArea className="max-w-sm">
              <div className="flex gap-3" ref={thumbsRef}>
                {files.map((file) => (
                  <DropzoneThumb
                    key={file.name}
                    fileWithPreview={{
                      file,
                      preview: URL.createObjectURL(file),
                    }}
                    className="size-24 shrink-0 rounded-xl"
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}

          <DropzoneZone
            className="size-24 shrink-0 rounded-xl border-muted-foreground/20 p-2"
            label={t("label")}
            dragActiveLabel={t("dragActiveLabel")}
            hint={t("hint")}
          />
        </div>
      </Dropzone>
      {isOptimizing ? (
        <div className="flex items-center gap-3">
          <Skeleton className="size-24 shrink-0 rounded-xl" />
        </div>
      ) : null}
    </BaseField>
  );
}
