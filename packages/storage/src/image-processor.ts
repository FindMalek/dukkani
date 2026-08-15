import { StorageFileEntity } from "@dukkani/common/entities/storage/entity";
import { isWebOptimizedMimeType } from "@dukkani/common/lib";
import {
  isImageMimeType,
  VARIANT_SIZES,
} from "@dukkani/common/schemas/constants";
import type {
  ImageVariant,
  ProcessedImage,
} from "@dukkani/common/schemas/storage/output";
import type sharpType from "sharp";

/**
 * sharp does its native-addon dlopen at module-evaluation time, not on first
 * call. Because this module is re-exported from the `@dukkani/storage`
 * barrel, importing *anything* from that package (StorageService, env, ...)
 * from any router previously forced sharp to load eagerly -- so a single
 * bundling gap for the native binary broke every request through those
 * routers, not just image-processing ones. Deferring the import to first use
 * means sharp only loads on requests that actually process an image.
 */
let sharpModulePromise: Promise<typeof sharpType> | undefined;

function getSharp(): Promise<typeof sharpType> {
  if (!sharpModulePromise) {
    sharpModulePromise = import("sharp").then((mod) => mod.default);
  }
  return sharpModulePromise;
}

/**
 * Image processor for optimization and variant generation
 * Uses Sharp for fast image processing with WebP/JPEG support
 */
export class ImageProcessor {
  /**
   * Process an image file and generate size variants
   */
  static async processImage(file: File): Promise<ProcessedImage> {
    // Validate that this is a supported image type
    if (!isImageMimeType(file.type)) {
      throw new Error(`Unsupported image format: ${file.type}`);
    }

    const sharp = await getSharp();

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get image metadata
    const metadata = await sharp(buffer).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error("Invalid image: unable to read dimensions");
    }

    // Determine output format (WebP preferred, fallback to JPEG)
    const isWebPSupported =
      metadata.format === "webp" ||
      metadata.format === "jpeg" ||
      metadata.format === "png";
    const outputFormat = isWebPSupported ? "webp" : "jpeg";
    const mimeType = outputFormat === "webp" ? "image/webp" : "image/jpeg";

    // Generate variants in parallel
    const variantPromises = Object.entries(VARIANT_SIZES).map(
      async ([variant, size]) => {
        const resized = await sharp(buffer)
          .resize(size.width, size.height, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .toFormat(outputFormat, {
            quality: outputFormat === "webp" ? 85 : 90,
          })
          .toBuffer({ resolveWithObject: true });

        return {
          variant: StorageFileEntity.convertToImageVariant(variant),
          buffer: resized.data,
          width: resized.info.width ?? size.width,
          height: resized.info.height ?? size.height,
          fileSize: resized.data.length,
          mimeType,
        } satisfies Omit<ImageVariant, "buffer"> & { buffer: Buffer };
      },
    );

    const variants = await Promise.all(variantPromises);

    // Optimize original (use medium size as optimized original)
    const mediumVariant = variants.find((v) => v.variant === "MEDIUM");
    const optimizedBuffer = mediumVariant
      ? mediumVariant.buffer
      : await sharp(buffer)
          .toFormat(outputFormat, {
            quality: outputFormat === "webp" ? 85 : 90,
          })
          .toBuffer();

    return {
      original: {
        buffer,
        width: metadata.width,
        height: metadata.height,
        fileSize: buffer.length,
        mimeType: file.type || `image/${metadata.format || "jpeg"}`,
      },
      variants,
      optimizedSize: optimizedBuffer.length,
    };
  }

  /**
   * Resize + compress an image for LLM vision input. Returns base64 JPEG only
   * (no variants, no upload) — purely for building a vision-model prompt payload.
   * Resizing to ~1024px/quality 80 cuts vision tokens/cost by ~80-95% with no
   * meaningful accuracy loss for description-generation use cases.
   */
  static async resizeForVision(
    file: File,
    {
      maxEdge = 1024,
      quality = 80,
    }: { maxEdge?: number; quality?: number } = {},
  ): Promise<{ base64: string; mimeType: "image/jpeg" }> {
    if (!isImageMimeType(file.type)) {
      throw new Error(`Unsupported image format: ${file.type}`);
    }

    const sharp = await getSharp();

    const buffer = Buffer.from(await file.arrayBuffer());
    const resized = await sharp(buffer)
      .resize(maxEdge, maxEdge, { fit: "inside", withoutEnlargement: true })
      .toFormat("jpeg", { quality })
      .toBuffer();

    return { base64: resized.toString("base64"), mimeType: "image/jpeg" };
  }

  /**
   * Generate variants from a buffer
   */
  static async generateVariants(
    buffer: Buffer,
    mimeType: string,
  ): Promise<ImageVariant[]> {
    // Validate MIME type
    if (!isImageMimeType(mimeType)) {
      throw new Error(`Unsupported image format: ${mimeType}`);
    }

    const sharp = await getSharp();

    const metadata = await sharp(buffer).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error("Invalid image: unable to read dimensions");
    }

    // Determine output format using type-safe logic
    const outputFormat = isWebOptimizedMimeType(mimeType) ? "webp" : "jpeg";
    const outputMimeType =
      outputFormat === "webp" ? "image/webp" : "image/jpeg";

    const variantPromises = Object.entries(VARIANT_SIZES).map(
      async ([variant, size]) => {
        const resized = await sharp(buffer)
          .resize(size.width, size.height, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .toFormat(outputFormat, {
            quality: outputFormat === "webp" ? 85 : 90,
          })
          .toBuffer({ resolveWithObject: true });

        return {
          variant: StorageFileEntity.convertToImageVariant(variant),
          buffer: resized.data,
          width: resized.info.width ?? size.width,
          height: resized.info.height ?? size.height,
          fileSize: resized.data.length,
          mimeType: outputMimeType,
        } satisfies Omit<ImageVariant, "buffer"> & { buffer: Buffer };
      },
    );

    return Promise.all(variantPromises);
  }
}
