"use client";

import * as React from "react";
import { Icons } from "@dukkani/ui/components/icons";
import { Button } from "@dukkani/ui/components/button";
import { Input } from "@dukkani/ui/components/input";
import { cn } from "@dukkani/ui/lib/utils";
import { ImageCropperDialog } from "@dukkani/ui/components/image-cropper";


interface ProductPhotosSectionProps {
  value: File[];
  onChange: (files: File[]) => void;
  optimizeFiles?: (files: File[]) => Promise<File[]>;
  label?: string;
}


export function ProductPhotosSection({
  value,
  onChange,
  optimizeFiles,
  label = "Photos",
}: ProductPhotosSectionProps) {
  const previewUrlsRef = React.useRef<Map<File, string>>(new Map());

  const [pendingImageSrc, setPendingImageSrc] = React.useState<string | null>(null);
  const [pendingFileName, setPendingFileName] = React.useState<string>("image.png");

  const fileInputRef = React.useRef<HTMLInputElement>(null);


  React.useEffect(() => {
    const urlMap = previewUrlsRef.current;
    const currentFiles = new Set(value);

    for (const [file, url] of urlMap.entries()) {
      if (!currentFiles.has(file)) {
        URL.revokeObjectURL(url);
        urlMap.delete(file);
      }
    }
  }, [value]);

  React.useEffect(() => {
    const urlMap = previewUrlsRef.current;
    return () => {
      urlMap.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function getPreviewUrl(file: File): string {
    if (!previewUrlsRef.current.has(file)) {
      previewUrlsRef.current.set(file, URL.createObjectURL(file));
    }
    return previewUrlsRef.current.get(file)!;
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const file = files[0]!;
    setPendingFileName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPendingImageSrc(reader.result as string);
    };

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCropComplete = React.useCallback(
    async (croppedFile: File | null) => {
      setPendingImageSrc(null);

      if (!croppedFile) return;

      let filesToAdd = [croppedFile];

      if (optimizeFiles) {
        try {
          filesToAdd = await optimizeFiles(filesToAdd);
        } catch (err) {
          console.error("Image optimisation failed:", err);
        }
      }

      onChange([...value, ...filesToAdd]);
    },
    [onChange, optimizeFiles, value],
  );

  const handleRemove = (index: number) => {
    const file = value[index];
    if (file) {
      const url = previewUrlsRef.current.get(file);
      if (url) {
        URL.revokeObjectURL(url);
        previewUrlsRef.current.delete(file);
      }
    }
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium leading-none">{label}</p>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {value.map((file, index) => (
          <PhotoThumbnail
            key={`${file.name}-${index}`}
            src={getPreviewUrl(file)}
            alt={file.name}
            onRemove={() => handleRemove(index)}
          />
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/40 text-muted-foreground transition-colors",
            "hover:border-muted-foreground/60 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          aria-label="Add photo"
        >
          <Icons.plus className="h-5 w-5" />
          <span className="text-xs">Add photo</span>
        </button>
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <ImageCropperDialog
        imageSrc={pendingImageSrc}
        fileName={pendingFileName}
        onComplete={handleCropComplete}
      />
    </div>
  );
}

interface PhotoThumbnailProps {
  src: string;
  alt: string;
  onRemove: () => void;
}

function PhotoThumbnail({ src, alt, onRemove }: PhotoThumbnailProps) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <Button
        type="button"
        variant="destructive"
        size="icon-sm"
        className={cn(
          "absolute right-1 top-1 rounded-full opacity-0 shadow-md transition-opacity",
          "group-hover:opacity-100 focus-visible:opacity-100",
        )}
        onClick={onRemove}
        aria-label={`Remove photo ${alt}`}
      >
        <Icons.x />
      </Button>
    </div>
  );
}