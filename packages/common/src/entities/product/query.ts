import { type Prisma } from "@dukkani/db/prisma/generated";
import { StoreQuery } from "../store/query";
import { ImageQuery } from "../image/query";
import { OrderItemQuery } from "../order-item/query";
export type ProductSimpleDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getSimpleInclude>;
}>;

export type ProductIncludeDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getInclude>;
}>;

export type ProductClientSafeDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getClientSafeInclude>;
}>;

export class ProductQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.ProductInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: StoreQuery.getSimpleInclude(),
			images: ImageQuery.getSimpleInclude(),
			orderItems: OrderItemQuery.getSimpleInclude(),
		} satisfies Prisma.ProductInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			images: ImageQuery.getSimpleInclude(),
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

		return where;
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
