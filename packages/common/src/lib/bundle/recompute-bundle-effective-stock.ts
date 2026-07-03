import type { Prisma } from "@dukkani/db/prisma/generated";
import { BundleItemQuery } from "../../entities/bundle-item/query";
import { computeBundleEffectiveStock } from "./compute-bundle-stock";

/**
 * Recompute and persist effective stock for a bundle's ProductVersion.
 * Sets both `stock` and `totalVariantStock` to the computed effective stock
 * so list filters and storefront OOS logic work correctly without extra queries.
 *
 * Lives in `lib/` (not a service) so both `BundleService` and
 * `ProductVersionService` can call it without a circular import between them.
 */
export async function recomputeBundleEffectiveStock(
  tx: Prisma.TransactionClient,
  bundleVersionId: string,
): Promise<void> {
  const bundleItems = await tx.bundleItem.findMany({
    where: { bundleVersionId },
    select: BundleItemQuery.getStockCheckSelect(),
  });

  const slots = bundleItems.map((bi) => {
    if (bi.childVariantId && bi.childVariant) {
      return {
        stock: bi.childVariant.stock,
        trackStock: bi.childVariant.trackStock,
        itemQty: bi.itemQty,
      };
    }
    const pub = bi.childProduct.currentPublishedVersion;
    if (!pub) {
      return { stock: 0, trackStock: true, itemQty: bi.itemQty };
    }
    return {
      stock: pub.stock,
      trackStock: true,
      itemQty: bi.itemQty,
    };
  });

  const effective = computeBundleEffectiveStock(slots);

  await tx.productVersion.update({
    where: { id: bundleVersionId },
    data: { stock: effective, totalVariantStock: effective },
  });
}
