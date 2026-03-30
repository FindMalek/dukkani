"use client";

import * as React from "react";
import Cropper from "react-easy-crop";
import { Button } from "@dukkani/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@dukkani/ui/components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dukkani/ui/components/select";
import { Slider } from "@dukkani/ui/components/slider";

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperDialogProps {
  imageSrc: string | null;
  onComplete: (file: File | null) => void;
  fileName?: string;
}

async function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop): Promise<File> {
  const image = new Image();
  if (!imageSrc.startsWith("data:") && !imageSrc.startsWith("blob:")) {
    image.crossOrigin = "anonymous";
  }
  image.src = imageSrc;
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas toBlob failed"));
        return;
      }
      const file = new File([blob], "cropped.png", { type: "image/png" });
      resolve(file);
    }, "image/png");
  });
}

const ASPECT_OPTIONS = [
  { label: "Free", value: "free" },
  { label: "1:1 (Square)", value: "1" },
  { label: "4:3", value: String(4 / 3) },
  { label: "3:4 (Portrait)", value: String(3 / 4) },
  { label: "16:9", value: String(16 / 9) },
] as const;

export function ImageCropperDialog({
  imageSrc,
  onComplete,
  fileName = "cropped.png",
}: ImageCropperDialogProps) {
  const open = imageSrc !== null;

  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [aspectKey, setAspectKey] = React.useState<string>("1");
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<PixelCrop | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setAspectKey("1");
      setCroppedAreaPixels(null);
    }
  }, [open, imageSrc]);

  const aspect = aspectKey === "free" ? undefined : Number(aspectKey);

  const onCropComplete = React.useCallback(
    (_croppedArea: unknown, pixels: PixelCrop) => {
      setCroppedAreaPixels(pixels);
    },
    [],
  );

  const handleConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const file = await getCroppedImg(imageSrc, croppedAreaPixels);
      const baseName = fileName.replace(/\.[^.]+$/, "");
      const croppedFile = new File([file], `${baseName}-cropped.png`, {
        type: "image/png",
      });
      onComplete(croppedFile);
    } catch (err) {
      console.error("Crop failed:", err);
      onComplete(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    onComplete(null);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && !isProcessing && handleCancel()}>
      <DialogContent
        className="w-full max-w-lg overflow-hidden p-0 sm:max-w-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* ── Header ── */}
        <DialogHeader className="shrink-0 border-b px-4 py-3">
          <DialogTitle className="text-base">Crop Image</DialogTitle>
        </DialogHeader>

        <div
          className="relative w-full bg-neutral-950"
          style={{ height: 380 }}
        >
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        <div className="shrink-0 space-y-4 border-t bg-background px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-sm text-muted-foreground">Zoom</span>
            <Slider
              value={[zoom]}
              onValueChange={(v) => v[0] !== undefined && setZoom(v[0])}
              min={1}
              max={3}
              step={0.01}
              className="flex-1"
            />
            <span className="w-10 text-right text-sm tabular-nums text-muted-foreground">
              {zoom.toFixed(1)}×
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-sm text-muted-foreground">Ratio</span>
            <Select value={aspectKey} onValueChange={setAspectKey}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ASPECT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="shrink-0 border-t bg-background px-4 py-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isProcessing}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!croppedAreaPixels}
            isLoading={isProcessing}
            className="flex-1 sm:flex-none"
          >
            Apply Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}