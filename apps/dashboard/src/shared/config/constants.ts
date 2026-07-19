import { MAX_VARIANT_COMBINATIONS } from "@dukkani/common/schemas/constants";

export const cookieConstants = {
  LAST_LOGIN_METHOD: "better-auth.last_used_login_method", // Cookie name for storing the last used login method (e.g., "google", "email")
} as const;

/**
 * `DashboardTopbar` (`components/layout/dashboard-topbar.tsx`) is `h-14` and
 * lives as a flex sibling *above* the scrollable content area (`SidebarProvider`
 * fixes the shell to `h-svh`; the content div below the topbar is the one
 * with `overflow-auto`). That means the topbar already reserves its own
 * space — an in-page sticky header inside the scrollable area only needs
 * `top-0` to sit flush below it, on every breakpoint. Kept as a named
 * constant (rather than a bare `top-0` scattered around) so any future
 * layout change that turns the topbar into an overlay is a one-line fix.
 */
export const layoutConstants = {
  TOPBAR_HEIGHT_CLASS: "h-14",
  TOPBAR_STICKY_OFFSET_CLASS: "top-0",
} as const;

export const productFormConstants = {
  MAX_IMAGES: 10,
} as const;

export const productVariantFormConstants = {
  MAX_OPTIONS: 3,
  MAX_COMBINATIONS: MAX_VARIANT_COMBINATIONS,
} as const;

export const productImagePreviewDialogConstants = {
  PLACEHOLDER_W: 1600,
  PLACEHOLDER_H: 1200,
  MIN_SCALE: 0.25,
  MAX_SCALE: 4,
  ZOOM_STEP: 0.25,
} as const;

export const imageCompressionConstants = {
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
} as const;
