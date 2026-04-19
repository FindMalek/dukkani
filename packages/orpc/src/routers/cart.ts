import { ProductEntity } from "@dukkani/common/entities/product/entity";
import {
  type ProductPublicDbDataWithPublished,
  ProductQuery,
} from "@dukkani/common/entities/product/query";
import { getCartItemsInputSchema } from "@dukkani/common/schemas/cart/input";
import {
  type CartItemOutput,
  cartItemOutputSchema,
} from "@dukkani/common/schemas/cart/output";
import type { ProductLineItem } from "@dukkani/common/schemas/product/input";
import { ProductService } from "@dukkani/common/services/product.service";
import { buildVariantDescription } from "@dukkani/common/utils/build-variant-description";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { rateLimitPublicSafe } from "../middleware/rate-limit";
import { baseProcedure } from "../procedures";

function buildCartItemOutput(
  item: ProductLineItem,
  unitPrice: number,
  product: ProductPublicDbDataWithPublished,
): CartItemOutput {
  const productData = ProductEntity.getPublicRo(product);
  const variant = item.variantId
    ? productData.variants?.find((v) => v.id === item.variantId)
    : null;

  return {
    productId: item.productId,
    variantId: item.variantId,
    quantity: item.quantity,
    productName: productData.name,
    productImage: productData.imageUrls?.[0],
    productDescription: buildVariantDescription(variant),
    price: unitPrice,
    stock: variant?.stock ?? productData.stock,
  };
}

export const cartRouter = {
  /**
   * Get enriched cart items with product data
   * Public endpoint for storefronts
   * Filters out items with missing or unpublished products
   */
  getCartItems: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getCartItemsInputSchema)
    .output(z.array(cartItemOutputSchema))
    .handler(async ({ input }): Promise<CartItemOutput[]> => {
      const productIds = Array.from(
        new Set(input.items.map((item) => item.productId)),
      );

      const products = await database.product.findMany({
        where: {
          id: { in: productIds },
          ...ProductQuery.getPublishableWhere(),
        },
        include: ProductQuery.getPublicInclude(),
      });

      const productMap = new Map(products.map((p) => [p.id, p]));

      const rows: Array<{
        item: ProductLineItem;
        product: ProductPublicDbDataWithPublished;
      }> = [];

      for (const item of input.items) {
        const product = productMap.get(item.productId);
        if (!product || !ProductQuery.isPublicWithPublished(product)) {
          continue;
        }
        rows.push({ item, product });
      }

      if (rows.length === 0) {
        return [];
      }

      const storeIds = new Set(rows.map((r) => r.product.storeId));
      if (storeIds.size !== 1) {
        throw new ORPCError("BAD_REQUEST", {
          message: "Cart items must belong to a single store",
        });
      }
      const storeId = [...storeIds][0]!;

      const priced = await ProductService.getOrderItemPrices(
        rows.map((r) => r.item),
        storeId,
      );

      return rows.map((row, i) =>
        buildCartItemOutput(row.item, priced[i]!.price, row.product),
      );
    }),
};
