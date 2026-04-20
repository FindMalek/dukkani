/**
 * Maps a variant's hero image URL to the index of that image in the product gallery.
 * Returns null when the variant has no image or the URL is not present in the gallery.
 */
function normalizeComparableUrl(url: string): string {
  try {
    const parsed = new URL(url, "https://placeholder.local");
    const pathname = parsed.pathname.replace(/\/$/, "") || "/";
    return `${parsed.origin}${pathname}`;
  } catch {
    return url.split(/[?#]/)[0]?.replace(/\/$/, "") ?? url;
  }
}

export function getGalleryIndexForVariantImage(
  imageUrls: string[],
  variantImageUrl: string | null,
): number | null {
  if (variantImageUrl == null || variantImageUrl === "") {
    return null;
  }
  const target = normalizeComparableUrl(variantImageUrl);
  const index = imageUrls.findIndex(
    (u) => normalizeComparableUrl(u) === target,
  );
  return index >= 0 ? index : null;
}
