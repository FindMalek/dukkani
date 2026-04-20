import {
  getFileExtensionFromMimeType,
  isImageMimeType,
  isSupportedMimeType,
  SUPPORTED_EXTENSION_LIST,
  SUPPORTED_MIME_TYPE_LIST,
  SUPPORTED_MIME_TYPES,
  type SupportedExtension,
  type SupportedMimeType,
} from "../../schemas/constants";

/**
 * Validation functions with descriptive errors
 */
export function validateMimeType(mimeType: string): SupportedMimeType {
  // Check cache first
  const cached = validationCache.get(mimeType);
  if (cached) {
    return cached;
  }

  if (!isSupportedMimeType(mimeType)) {
    throw new Error(
      `Unsupported MIME type: ${mimeType}. ` +
        `Supported types: ${SUPPORTED_MIME_TYPE_LIST.join(", ")}`,
    );
  }

  // Cache the result
  if (validationCache.size >= CACHE_SIZE) {
    const firstKey = validationCache.keys().next().value;
    if (firstKey) {
      validationCache.delete(firstKey);
    }
  }
  // No type assertion needed - TypeScript knows mimeType is SupportedMimeType
  validationCache.set(mimeType, mimeType);

  return mimeType;
}

export function validateFileExtension(extension: string): SupportedExtension {
  if (!SUPPORTED_EXTENSION_LIST.includes(extension as SupportedExtension)) {
    throw new Error(
      `Unsupported file extension: ${extension}. ` +
        `Supported extensions: ${SUPPORTED_EXTENSION_LIST.join(", ")}`,
    );
  }
  // Type assertion is safe here since we validated the extension is in the list
  return extension as SupportedExtension;
}

/**
 * Performance-optimized lookup functions
 */
export function getCachedExtension(
  mimeType: string,
): SupportedExtension | undefined {
  // Check if MIME type is supported before accessing the map
  if (!SUPPORTED_MIME_TYPE_LIST.includes(mimeType as SupportedMimeType)) {
    return undefined;
  }
  return getFileExtensionFromMimeType(mimeType as SupportedMimeType);
}

export function getCachedMimeType(
  extension: string,
): SupportedMimeType | undefined {
  // Check if extension is supported before accessing the map
  if (!SUPPORTED_EXTENSION_LIST.includes(extension as SupportedExtension)) {
    return undefined;
  }
  // Find MIME type by extension
  for (const [mimeType, ext] of Object.entries(SUPPORTED_MIME_TYPES)) {
    if (ext === extension) {
      return mimeType as SupportedMimeType;
    }
  }
  return undefined;
}

/**
 * Category detection functions
 */
export function detectFileCategory(
  mimeType: string,
): "image" | "document" | null {
  if (isImageMimeType(mimeType)) return "image";
  if (isSupportedMimeType(mimeType)) return "document";
  return null;
}

/**
 * Safe conversion functions with fallback handling
 */
export function extractFileExtensionFromMimeType(mimeType: string): string {
  try {
    const validatedMimeType = validateMimeType(mimeType);
    return getFileExtensionFromMimeType(validatedMimeType);
  } catch {
    // Fallback for unknown MIME types
    return extractFallbackExtension(mimeType);
  }
}

export function extractFallbackExtension(mimeType: string): string {
  if (mimeType.includes("/")) {
    const [, subtype] = mimeType.split("/");
    if (subtype && subtype.length <= 10 && /^[a-z0-9-]+$/.test(subtype)) {
      return subtype.toLowerCase();
    }
  }
  return "bin";
}

/**
 * Format-specific helper functions
 */
export function isVectorMimeType(mimeType: string): boolean {
  return mimeType === "image/svg+xml";
}

export function isModernMimeType(mimeType: string): boolean {
  return (
    mimeType === "image/avif" ||
    mimeType === "image/heic" ||
    mimeType === "image/heif"
  );
}

export function isWebOptimizedMimeType(mimeType: string): boolean {
  return mimeType === "image/webp" || mimeType === "image/avif";
}

export function isPhotoFormat(mimeType: SupportedMimeType): boolean {
  return (
    mimeType === "image/jpeg" ||
    mimeType === "image/jpg" ||
    mimeType === "image/heic" ||
    mimeType === "image/heif"
  );
}

/**
 * Batch validation and conversion utilities
 */
export function validateMimeTypes(mimeTypes: string[]): SupportedMimeType[] {
  return mimeTypes.map(validateMimeType);
}

export function extractExtensionsFromMimeTypes(mimeTypes: string[]): string[] {
  return mimeTypes.map(extractFileExtensionFromMimeType);
}

/**
 * Statistics and analytics helpers
 */
export function getMimeTypeStats() {
  return {
    totalSupported: SUPPORTED_MIME_TYPE_LIST.length,
    imageTypes: SUPPORTED_MIME_TYPE_LIST.filter((m) => m.startsWith("image/"))
      .length,
    documentTypes: SUPPORTED_MIME_TYPE_LIST.filter(
      (m) => m.startsWith("application/") || m.startsWith("text/"),
    ).length,
    webOptimized: 2, // webp, avif
    traditional: 3, // jpeg, jpg, png
    specialized: 3, // gif, svg, heic/heif
  };
}

const validationCache = new Map<string, SupportedMimeType>();
const CACHE_SIZE = 1000;
