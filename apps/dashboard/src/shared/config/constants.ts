export const appConstants = {
  cookies: {
    LAST_LOGIN_METHOD: "better-auth.last_used_login_method", // Cookie name for storing the last used login method (e.g., "google", "email")
  },
  imageCompression: {
    COMPRESS_SKIP_BELOW_BYTES: 1024 * 1024, // 1MB
    RETRIES_PER_PROFILE: 2, // Number of retries per compression profile
    COMPRESSION_PROFILES: [
      {
        maxSizeMB: 1, // Target max size in MB for the compressed image
        maxWidthOrHeight: 1600, // Max width or height in pixels (maintains aspect ratio)
        initialQuality: 0.85, // Initial quality setting (0 to 1) for compression
        useWebWorker: true, // Whether to use a web worker for compression (can improve performance)
      },
      {
        maxSizeMB: 0.85,
        maxWidthOrHeight: 1600,
        initialQuality: 0.72,
        useWebWorker: true,
      },
      {
        maxSizeMB: 0.75,
        maxWidthOrHeight: 1400,
        initialQuality: 0.6,
        useWebWorker: false,
      },
    ],
  },
} as const;
