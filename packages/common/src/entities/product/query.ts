import type { Prisma } from "@dukkani/db/prisma/generated";
import { ImageQuery } from "../image/query";
import { OrderItemQuery } from "../order-item/query";
import { StoreQuery } from "../store/query";
import { VariantQuery } from "../variant/query";

export type ProductSimpleDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getSimpleInclude>;
}>;

export type ProductIncludeDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getInclude>;
}>;

export type ProductClientSafeDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getClientSafeInclude>;
}>;

export type ProductListDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getListInclude>;
}>;

export type ProductPublicDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getPublicInclude>;
}>;

export class ProductQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.ProductInclude;
	}

	static getPublicInclude() {
		return {
			...ProductQuery.getSimpleInclude(),
			images: {
				select: ImageQuery.getPublicSelect(),
			},
			store: {
				select: StoreQuery.getPublicSimpleSelect(),
			},
			variantOptions: {
				include: VariantQuery.getVariantOptionInclude(),
			},
			variants: {
				include: VariantQuery.getVariantInclude(),
			},
		} satisfies Prisma.ProductInclude;
	}

	static getInclude() {
		return {
			...ProductQuery.getSimpleInclude(),
			images: ImageQuery.getSimpleInclude(),
			orderItems: OrderItemQuery.getSimpleInclude(),
		} satisfies Prisma.ProductInclude;
	}

	static getClientSafeInclude() {
		return {
			...ProductQuery.getSimpleInclude(),
			images: ImageQuery.getSimpleInclude(),
		} satisfies Prisma.ProductInclude;
	}

	static getListInclude() {
		return {
			...ProductQuery.getClientSafeInclude(),
			_count: {
				select: { variants: true },
			},
		} satisfies Prisma.ProductInclude;
	}

	/**
	 * Generate where clause for filtering products by store IDs and optional filters
	 */
	static getWhere(
		storeIds: string[],
		filters?: {
			storeId?: string;
			published?: boolean;
			search?: string;
			stock?: { lte?: number; gte?: number };
			hasVariants?: boolean;
			priceMin?: number;
			priceMax?: number;
		},
	): Prisma.ProductWhereInput {
		const where: Prisma.ProductWhereInput = {
			storeId: { in: storeIds },
		};

		if (filters?.storeId) {
			where.storeId = { in: [filters.storeId] };
		}

		if (filters?.published !== undefined) {
			where.published = filters.published;
		}

		if (filters?.search) {
			where.OR = [
				{ name: { contains: filters.search, mode: "insensitive" } },
				{ description: { contains: filters.search, mode: "insensitive" } },
			];
		}

		if (filters?.stock) {
			const stockFilter: { lte?: number; gte?: number } = {};
			if (filters.stock.lte !== undefined) {
				stockFilter.lte = filters.stock.lte;
			}
			if (filters.stock.gte !== undefined) {
				stockFilter.gte = filters.stock.gte;
			}
			if (Object.keys(stockFilter).length > 0) {
				where.stock = stockFilter;
			}
		}

		if (filters?.hasVariants !== undefined) {
			where.hasVariants = filters.hasVariants;
		}

		if (filters?.priceMin !== undefined || filters?.priceMax !== undefined) {
			where.price = {};
			if (filters.priceMin !== undefined) {
				where.price.gte = filters.priceMin;
			}
			if (filters.priceMax !== undefined) {
				where.price.lte = filters.priceMax;
			}
		}

		return where;
	}

	/**
	 * Get where clause for products that should be visible publicly
	 * Centralizes logic for determining publishable products
	 * Currently: published = true
	 * Future: Can extend to include isDeleted = false, archived = false, etc.
	 */
	static getPublishableWhere(): Prisma.ProductWhereInput {
		return {
			published: true,
			// Future: Add additional conditions here as needed
			// isDeleted: false,
			// archived: false,
			// etc.
		};
	}

	/**
	 * Generate orderBy clause for products
	 */
	static getOrder(
		orderBy: "asc" | "desc" = "desc",
		field: "createdAt" | "updatedAt" | "name" | "price" | "stock" = "createdAt",
	): Prisma.ProductOrderByWithRelationInput {
		return { [field]: orderBy };
	}
}
