import { ProductEntity } from "@dukkani/common/entities/product/entity";
import {
	type ProductPublicDbData,
	ProductQuery,
} from "@dukkani/common/entities/product/query";
import { getCartItemsInputSchema } from "@dukkani/common/schemas/cart/input";
import {
	type CartItemOutput,
	cartItemOutputSchema,
} from "@dukkani/common/schemas/cart/output";
import { buildVariantDescription } from "@dukkani/common/utils/build-variant-description";
import { database } from "@dukkani/db";
import { z } from "zod";
import { baseProcedure } from "../index";
import { rateLimitPublicSafe } from "../middleware/rate-limit";

/**
 * Transform cart item input and product data to cart item output
 */
function enrichCartItem(
	item: { productId: string; variantId?: string; quantity: number },
	product: ProductPublicDbData,
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
		productImage: productData.imagesUrls?.[0],
		productDescription: buildVariantDescription(variant),
		price: variant?.price ?? productData.price,
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
			// Get unique product IDs for efficient database query
			const productIds = Array.from(
				new Set(input.items.map((item) => item.productId)),
			);

			// Fetch all products in one query
			const products = await database.product.findMany({
				where: {
					id: { in: productIds },
					...ProductQuery.getPublishableWhere(),
				},
				include: ProductQuery.getPublicInclude(),
			});

			// Create map for O(1) lookup
			const productMap = new Map(products.map((p) => [p.id, p]));

			// Enrich cart items and filter out missing products
			return input.items
				.map((item) => {
					const product = productMap.get(item.productId);
					return product ? enrichCartItem(item, product) : null;
				})
				.filter((item): item is CartItemOutput => item !== null);
		}),
};
