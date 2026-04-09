import imageCompression from "browser-image-compression";
import { appConstants } from "@/shared/config/constants";

function stripExtension(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? name : name.slice(0, i);
}

function toWebpFile(blob: File, originalName: string): File {
  const base = stripExtension(originalName) || "image";
  return new File([blob], `${base}.webp`, {
    type: blob.type || "image/webp",
    lastModified: Date.now(),
  });
}

async function compressWithProfile(
  file: File,
  profile: (typeof appConstants.imageCompression.COMPRESSION_PROFILES)[number],
): Promise<File> {
  const compressed = await imageCompression(file, {
    maxSizeMB: profile.maxSizeMB,
    maxWidthOrHeight: profile.maxWidthOrHeight,
    useWebWorker: profile.useWebWorker,
    fileType: "image/webp",
    initialQuality: profile.initialQuality,
  });
  return toWebpFile(compressed, file.name);
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function compressImageForUpload(file: File): Promise<File> {
  if (
    !file.type.startsWith("image/") ||
    file.size <= appConstants.imageCompression.COMPRESS_SKIP_BELOW_BYTES
  ) {
    return file;
  }

  let lastError: unknown;

  for (const profile of appConstants.imageCompression.COMPRESSION_PROFILES) {
    for (
      let attempt = 1;
      attempt <= appConstants.imageCompression.RETRIES_PER_PROFILE;
      attempt++
    ) {
      try {
        return await compressWithProfile(file, profile);
      } catch (error) {
        lastError = error;
        if (attempt < appConstants.imageCompression.RETRIES_PER_PROFILE) {
          await sleep(120 * attempt);
        }
      }
    }
  }

  const message =
    lastError instanceof Error
      ? lastError.message
      : "Image compression failed after retries";
  throw new Error(message);
}

export async function compressImagesForUpload(files: File[]): Promise<File[]> {
  return Promise.all(files.filter(Boolean).map(compressImageForUpload));
}
