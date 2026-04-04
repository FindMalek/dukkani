"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { useObjectUrlPreviews } from "../../hooks/use-object-url-previews";
import { ImageFileTrigger } from "../image-file-trigger";
import { ImagePreviewStrip } from "../image-preview-strip";
import { ImagePreviewThumb } from "../image-preview-thumb";
import { Skeleton } from "../skeleton";
import { BaseField, type CommonFieldProps } from "./base-field";

const UNBOUNDED_MAX_FILES = 0x7fff_ffff;

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
  const filesRef = React.useRef(files);
  filesRef.current = files;
  const [isTransforming, setIsTransforming] = React.useState(false);

  const fileIdMap = React.useRef(new WeakMap<File, string>());
  const getFileId = React.useCallback((file: File) => {
    let id = fileIdMap.current.get(file);
    if (!id) {
      id = crypto.randomUUID();
      fileIdMap.current.set(file, id);
    }
    return id;
  }, []);

  const previewItems = React.useMemo(
    () => files.map((file) => ({ id: getFileId(file), file })),
    [files, getFileId],
  );

  const previewById = useObjectUrlPreviews(previewItems);

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

  const handleRemove = (index: number) => {
    field.handleChange(files.filter((_, i) => i !== index));
    field.handleBlur();
  };

  const onFilesSelected = React.useCallback(
    (newFiles: File[]) => {
      const current = filesRef.current;
      if (multiple) {
        field.handleChange([...current, ...newFiles]);
      } else {
        field.handleChange(newFiles.slice(0, 1));
      }
      field.handleBlur();
    },
    [field, multiple],
  );

  const maxFiles = multiple ? UNBOUNDED_MAX_FILES : 1;
  const mode = multiple ? "append" : "replace";

  return (
    <BaseField
      label={label}
      description={description}
      srOnlyLabel={srOnlyLabel}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center gap-3">
          {files.length > 0 && (
            <ImagePreviewStrip
              thumbsRef={thumbsRef}
              scrollAreaClassName="max-w-sm"
            >
              {files.map((file, index) => {
                const id = getFileId(file);
                return (
                  <ImagePreviewThumb
                    key={id}
                    src={previewById[id]}
                    alt={file.name}
                    className="border-muted-foreground/20"
                    onRemove={() => handleRemove(index)}
                    removeAriaLabel={`Remove ${file.name}`}
                  />
                );
              })}
            </ImagePreviewStrip>
          )}

          <ImageFileTrigger
            maxFiles={maxFiles}
            currentCount={files.length}
            mode={mode}
            className="border-muted-foreground/20 p-2"
            label={t("label")}
            hint={t("hint")}
            transformFiles={optimizeFiles}
            onBusyChange={optimizeFiles ? setIsTransforming : undefined}
            onFilesSelected={onFilesSelected}
          />
        </div>
        {isTransforming ? (
          <div className="flex items-center gap-3">
            <Skeleton className="size-24 shrink-0 rounded-xl" />
          </div>
        ) : null}
      </div>
    </BaseField>
  );
}
