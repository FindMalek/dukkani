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
	 * Aggregates quantities by productId to handle duplicate products correctly
	 */
	static async checkStockAvailability(
		items: Array<{ productId: string; quantity: number }>,
		storeId: string,
		tx?: PrismaClient,
	): Promise<void> {
		addSpanAttributes({
			"product.store_id": storeId,
			"product.items_count": items.length,
		});

		const client = tx ?? database;

		// Aggregate required quantities by productId to handle duplicates
		const requiredByProduct = new Map<string, number>();
		for (const { productId, quantity } of items) {
			requiredByProduct.set(
				productId,
				(requiredByProduct.get(productId) ?? 0) + quantity,
			);
		}

		// Deduplicate productIds for database query
		const uniqueProductIds = Array.from(requiredByProduct.keys());

		const products = await client.product.findMany({
			where: {
				id: { in: uniqueProductIds },
				storeId,
			},
			select: {
				id: true,
				stock: true,
			},
		});

		// Validate all products were found
		if (products.length !== uniqueProductIds.length) {
			throw new Error(
				"One or more products not found or don't belong to this store",
			);
		}

		addSpanAttributes({
			"product.unique_products": uniqueProductIds.length,
			"product.total_quantity": Array.from(requiredByProduct.values()).reduce(
				(a, b) => a + b,
				0,
			),
		});

		// Validate aggregated quantities against stock
		for (const [productId, required] of requiredByProduct.entries()) {
			const product = products.find(
				(p: { id: string; stock: number }) => p.id === productId,
			);
			if (!product || product.stock < required) {
				throw new Error(`Insufficient stock for product ${productId}`);
			}
		}
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
	 * Aggregates quantities by productId to handle duplicate products correctly
	 */
	static async updateMultipleProductStocks(
		updates: Array<{ productId: string; quantity: number }>,
		operation: "increment" | "decrement",
		tx?: PrismaClient,
	): Promise<void> {
		addSpanAttributes({
			"product.updates_count": updates.length,
			"product.operation": operation,
		});
		const client = tx ?? database;

		// Aggregate quantities by productId to handle duplicates
		const aggregatedUpdates = new Map<string, number>();
		for (const { productId, quantity } of updates) {
			aggregatedUpdates.set(
				productId,
				(aggregatedUpdates.get(productId) ?? 0) + quantity,
			);
		}

		// Update each product once with aggregated quantity
		await Promise.all(
			Array.from(aggregatedUpdates.entries()).map(([productId, quantity]) =>
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

		addSpanAttributes({
			"product.products_updated": aggregatedUpdates.size,
			"product.total_quantity_change": Array.from(
				aggregatedUpdates.values(),
			).reduce((a, b) => a + b, 0),
		});
	}
}

export const ProductService = traceStaticClass(ProductServiceBase);
