import type { ListProductOutput } from "@dukkani/common/schemas/product/output";
import { useTranslations } from "next-intl";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

/**
 * Derives the display strings shared by every products-list presentation
 * (mobile card, desktop table) from a single {@link ListProductOutput}.
 *
 * Keeps price/stock formatting in one place so the card and table can't
 * drift — `ListProductOutput` only carries the aggregate `stock` +
 * `isOutOfStock` fields (no per-variant breakdown), so there's no "varies"
 * state to compute here; both views show the same aggregate text.
 */
export function useProductListItemView(product: ListProductOutput) {
  const t = useTranslations("products.list");
  const formatPrice = useFormatPriceForActiveStore();

  const priceLabel =
    product.priceDisplay.kind === "range"
      ? `${formatPrice(product.priceDisplay.min)} – ${formatPrice(product.priceDisplay.max)}`
      : formatPrice(product.priceDisplay.price);

  const isOutOfStock = product.isOutOfStock;
  const stockStatusText = isOutOfStock
    ? t("outOfStock")
    : product.stock > 0
      ? t("stockCount", { count: product.stock })
      : t("inStock");

  return {
    priceLabel,
    isOutOfStock,
    stockStatusText,
    firstImageUrl: product.imageUrls[0],
  };
}
