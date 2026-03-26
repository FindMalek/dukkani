import imageCompression from "browser-image-compression";

const COMPRESS_SKIP_BELOW_BYTES = 1024 * 1024;
const MAX_LONG_EDGE = 1600;
const RETRIES_PER_PROFILE = 2;

const COMPRESSION_PROFILES = [
  {
    maxSizeMB: 1,
    maxWidthOrHeight: MAX_LONG_EDGE,
    initialQuality: 0.85,
    useWebWorker: true,
  },
  {
    maxSizeMB: 0.85,
    maxWidthOrHeight: MAX_LONG_EDGE,
    initialQuality: 0.72,
    useWebWorker: true,
  },
  {
    maxSizeMB: 0.75,
    maxWidthOrHeight: 1400,
    initialQuality: 0.6,
    useWebWorker: false,
  },
] as const;

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
  profile: (typeof COMPRESSION_PROFILES)[number],
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
    file.size <= COMPRESS_SKIP_BELOW_BYTES
  ) {
    return file;
  }

  let lastError: unknown;

  for (const profile of COMPRESSION_PROFILES) {
    for (let attempt = 1; attempt <= RETRIES_PER_PROFILE; attempt++) {
      try {
        return await compressWithProfile(file, profile);
      } catch (error) {
        lastError = error;
        if (attempt < RETRIES_PER_PROFILE) {
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
