import { ProductEntity } from "@dukkani/common/entities/product/entity";
import { ProductQuery } from "@dukkani/common/entities/product/query";
import { getCartItemsInputSchema } from "@dukkani/common/schemas/cart/input";
import {
  type CartItemOutput,
  cartItemOutputSchema,
} from "@dukkani/common/schemas/cart/output";
import { ProductService } from "@dukkani/common/services/product.service";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure } from "../../procedures";

export const cartRouter = {
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

      const rows = input.items.flatMap((item) => {
        const product = productMap.get(item.productId);
        if (!product || !ProductQuery.isPublicWithPublished(product)) return [];
        return [{ item, product }];
      });

      if (rows.length === 0) return [];

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
        ProductEntity.getCartItemRo(row.product, row.item, priced[i]?.price ?? 0),
      );
    }),
};
