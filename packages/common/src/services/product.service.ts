import { database } from "@dukkani/db";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import type { PrismaClient } from "@prisma/client/extension";
import { generateProductId } from "../utils/generate-id";

/**
 * Product service - Shared business logic for product operations
 * All methods are automatically traced via traceStaticClass
 */
class ProductServiceBase {
	/**
	 * Generate product ID using store slug
	 */
	static generateProductId(storeSlug: string): string {
		return generateProductId(storeSlug);
	}

	/**
	 * Validate that products exist and belong to the specified store
	 */
	static async validateProductsExist(
		productIds: string[],
		storeId: string,
		tx?: PrismaClient,
	): Promise<void> {
		const client = tx ?? database;
		const products = await client.product.findMany({
			where: {
				id: { in: productIds },
				storeId,
			},
			select: {
				id: true,
			},
		});

		if (products.length !== productIds.length) {
			throw new Error(
				"One or more products not found or don't belong to this store",
			);
		}
	}

	/**
	 * Check stock availability for order items
	 * - For items with variantId: checks ProductVariant.stock
	 * - For items without variantId: checks Product.stock
	 * Aggregates quantities by (productId, variantId) to handle duplicates correctly
	 */
	static async checkStockAvailability(
		items: Array<{ productId: string; variantId?: string; quantity: number }>,
		storeId: string,
		tx?: PrismaClient,
	): Promise<void> {
		addSpanAttributes({
			"product.store_id": storeId,
			"product.items_count": items.length,
		});

		const client = tx ?? database;

		// Aggregate by (productId, variantId) - use empty string for non-variant items
		const requiredByKey = new Map<string, number>();
		for (const { productId, variantId, quantity } of items) {
			const key = variantId ? `${productId}:${variantId}` : `${productId}:`;
			requiredByKey.set(key, (requiredByKey.get(key) ?? 0) + quantity);
		}

		// Split into variant items and product-only items
		const variantItems: Array<{
			productId: string;
			variantId: string;
			quantity: number;
		}> = [];
		const productItems: Array<{ productId: string; quantity: number }> = [];
		for (const [key, quantity] of requiredByKey.entries()) {
			const colonIdx = key.indexOf(":");
			const productId = colonIdx >= 0 ? key.slice(0, colonIdx) : key;
			const variantId = colonIdx >= 0 ? key.slice(colonIdx + 1) : "";
			if (variantId) {
				variantItems.push({ productId, variantId, quantity });
			} else {
				productItems.push({ productId, quantity });
			}
		}

		// Check variant stock for items with variantId
		if (variantItems.length > 0) {
			const uniqueVariantIds = [
				...new Set(variantItems.map((i) => i.variantId)),
			];
			const variants = await client.productVariant.findMany({
				where: {
					id: { in: uniqueVariantIds },
					product: { storeId },
				},
				select: { id: true, productId: true, stock: true },
			});

			for (const item of variantItems) {
				const variant = variants.find(
					(v: { id: string; productId: string; stock: number }) =>
						v.id === item.variantId && v.productId === item.productId,
				);
				if (!variant) {
					throw new Error(
						"Product variant not found or doesn't belong to this store",
					);
				}
				if (variant.stock < item.quantity) {
					throw new Error(
						`Insufficient stock for product ${item.productId} (variant ${item.variantId})`,
					);
				}
			}
		}

		// Check product stock for items without variantId
		if (productItems.length > 0) {
			const uniqueProductIds = [
				...new Set(productItems.map((i) => i.productId)),
			];
			const products = await client.product.findMany({
				where: {
					id: { in: uniqueProductIds },
					storeId,
				},
				select: { id: true, stock: true },
			});

			if (products.length !== uniqueProductIds.length) {
				throw new Error(
					"One or more products not found or don't belong to this store",
				);
			}

			for (const item of productItems) {
				const product = products.find(
					(p: { id: string; stock: number }) => p.id === item.productId,
				);
				if (!product || product.stock < item.quantity) {
					throw new Error(`Insufficient stock for product ${item.productId}`);
				}
			}
		}

		addSpanAttributes({
			"product.variant_items": variantItems.length,
			"product.simple_items": productItems.length,
			"product.total_quantity": Array.from(requiredByKey.values()).reduce(
				(a, b) => a + b,
				0,
			),
		});
	}

	/**
	 * Update product stock
	 */
	static async updateProductStock(
		productId: string,
		quantity: number,
		operation: "increment" | "decrement",
		tx?: PrismaClient,
	): Promise<void> {
		addSpanAttributes({
			"product.id": productId,
			"product.quantity": quantity,
			"product.operation": operation,
		});

		const client = tx ?? database;
		await client.product.update({
			where: { id: productId },
			data: {
				stock: {
					[operation]: quantity,
				},
			},
		});
	}

	/**
	 * Update multiple product stocks
	 * - For items with variantId: updates ProductVariant.stock
	 * - For items without variantId: updates Product.stock
	 * Aggregates quantities by (productId, variantId) to handle duplicates correctly
	 */
	static async updateMultipleProductStocks(
		updates: Array<{ productId: string; variantId?: string; quantity: number }>,
		operation: "increment" | "decrement",
		tx?: PrismaClient,
	): Promise<void> {
		addSpanAttributes({
			"product.updates_count": updates.length,
			"product.operation": operation,
		});
		const client = tx ?? database;

		// Aggregate by (productId, variantId) - use empty string for non-variant items
		const aggregatedByKey = new Map<string, number>();
		for (const { productId, variantId, quantity } of updates) {
			const key = variantId ? `${productId}:${variantId}` : `${productId}:`;
			aggregatedByKey.set(key, (aggregatedByKey.get(key) ?? 0) + quantity);
		}

		// Split into variant updates and product updates
		const variantUpdates: Array<{ variantId: string; quantity: number }> = [];
		const productUpdates: Array<{ productId: string; quantity: number }> = [];
		for (const [key, quantity] of aggregatedByKey.entries()) {
			const colonIdx = key.indexOf(":");
			const productId = colonIdx >= 0 ? key.slice(0, colonIdx) : key;
			const variantId = colonIdx >= 0 ? key.slice(colonIdx + 1) : "";
			if (variantId) {
				variantUpdates.push({ variantId, quantity });
			} else {
				productUpdates.push({ productId, quantity });
			}
		}

		// Update variant stocks
		if (variantUpdates.length > 0) {
			await Promise.all(
				variantUpdates.map(({ variantId, quantity }) =>
					client.productVariant.update({
						where: { id: variantId },
						data: {
							stock: {
								[operation]: quantity,
							},
						},
					}),
				),
			);
		}

		// Update product stocks
		if (productUpdates.length > 0) {
			await Promise.all(
				productUpdates.map(({ productId, quantity }) =>
					client.product.update({
						where: { id: productId },
						data: {
							stock: {
								[operation]: quantity,
							},
						},
					}),
				),
			);
		}

		addSpanAttributes({
			"product.variants_updated": variantUpdates.length,
			"product.products_updated": productUpdates.length,
			"product.total_quantity_change": Array.from(
				aggregatedByKey.values(),
			).reduce((a, b) => a + b, 0),
		});
	}
}

export const ProductService = traceStaticClass(ProductServiceBase);
