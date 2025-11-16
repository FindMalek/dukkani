import prisma from "@dukkani/db";
import { generateProductId } from "../utils/generate-id";

/**
 * Product service - Shared business logic for product operations
 */
export class ProductService {
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
	): Promise<void> {
		const products = await prisma.product.findMany({
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
	 */
	static async checkStockAvailability(
		items: Array<{ productId: string; quantity: number }>,
		storeId: string,
	): Promise<void> {
		const productIds = items.map((item) => item.productId);
		const products = await prisma.product.findMany({
			where: {
				id: { in: productIds },
				storeId,
			},
			select: {
				id: true,
				stock: true,
			},
		});

		if (products.length !== productIds.length) {
			throw new Error(
				"One or more products not found or don't belong to this store",
			);
		}

		for (const item of items) {
			const product = products.find((p) => p.id === item.productId);
			if (!product || product.stock < item.quantity) {
				throw new Error(
					`Insufficient stock for product ${item.productId}`,
				);
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
	): Promise<void> {
		await prisma.product.update({
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
	 */
	static async updateMultipleProductStocks(
		updates: Array<{ productId: string; quantity: number }>,
		operation: "increment" | "decrement",
	): Promise<void> {
		await Promise.all(
			updates.map((update) =>
				this.updateProductStock(update.productId, update.quantity, operation),
			),
		);
	}
}
