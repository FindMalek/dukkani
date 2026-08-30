import type { CSSProperties } from "react";

export const PRODUCT_IMAGE_ASPECT_RATIO = 1 as const;
export const PRODUCT_IMAGE_SIZE = 800 as const;
export const PRODUCT_IMAGE_ASPECT_RATIO_CSS = `${PRODUCT_IMAGE_ASPECT_RATIO} / 1` as const;

const DEFAULT_PRODUCT_IMAGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${PRODUCT_IMAGE_SIZE}" height="${PRODUCT_IMAGE_SIZE}" viewBox="0 0 ${PRODUCT_IMAGE_SIZE} ${PRODUCT_IMAGE_SIZE}"><rect width="100%" height="100%" fill="#e5e7eb"/><path d="M320 260h160v160H320z" fill="#9ca3af"/><text x="50%" y="56%" font-family="sans-serif" font-size="48" fill="#4b5563" text-anchor="middle">Product</text></svg>`;

export const DEFAULT_PRODUCT_IMAGE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(DEFAULT_PRODUCT_IMAGE_SVG)}`;

export interface ProductImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

export function ProductImage({
  src,
  alt = "Product image",
  className = "",
  style,
}: ProductImageProps) {
  return (
    <img
      src={src || DEFAULT_PRODUCT_IMAGE}
      alt={alt}
      width={PRODUCT_IMAGE_SIZE}
      height={PRODUCT_IMAGE_SIZE}
      className={`aspect-square h-auto w-full object-cover ${className}`.trim()}
      style={{
        aspectRatio: PRODUCT_IMAGE_ASPECT_RATIO_CSS,
        objectFit: "cover",
        width: "100%",
        height: "auto",
        ...style,
      }}
      loading="lazy"
    />
  );
}
