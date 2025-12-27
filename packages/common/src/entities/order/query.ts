import type { OrderStatus } from "@dukkani/common/schemas/order/enums";
import type { Prisma } from "@dukkani/db/prisma/generated";
import { CustomerQuery } from "../customer/query";

export type OrderSimpleDbData = Prisma.OrderGetPayload<{
	include: ReturnType<typeof OrderQuery.getSimpleInclude>;
}>;

export type OrderIncludeDbData = Prisma.OrderGetPayload<{
	include: ReturnType<typeof OrderQuery.getInclude>;
}>;

export type OrderClientSafeDbData = Prisma.OrderGetPayload<{
	include: ReturnType<typeof OrderQuery.getClientSafeInclude>;
}>;

export class OrderQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.OrderInclude;
	}

	static getInclude() {
		return {
			...OrderQuery.getSimpleInclude(),
			store: true,
			customer: CustomerQuery.getSimpleInclude(),
			orderItems: true,
			whatsappMessages: true,
		} satisfies Prisma.OrderInclude;
	}

	static getClientSafeInclude() {
		return {
			...OrderQuery.getSimpleInclude(),
			orderItems: true,
		} satisfies Prisma.OrderInclude;
	}

	/**
	 * Generate where clause for filtering orders by store IDs and optional filters
	 */
	static getWhere(
		storeIds: string[],
		filters?: {
			storeId?: string;
			status?: OrderStatus;
			customerId?: string;
			search?: string;
		},
	): Prisma.OrderWhereInput {
		const where: Prisma.OrderWhereInput = {
			storeId: { in: storeIds },
		};

		if (filters?.storeId) {
			where.storeId = { in: [filters.storeId] };
		}

		if (filters?.status) {
			where.status = filters.status;
		}

		if (filters?.customerId) {
			where.customerId = filters.customerId;
		}

		if (filters?.search) {
			where.OR = [
				{ customerName: { contains: filters.search, mode: "insensitive" } },
				{ customerPhone: { contains: filters.search, mode: "insensitive" } },
			];
		}

		return where;
	}

	/**
	 * Generate orderBy clause for orders
	 */
	static getOrder(
		orderBy: "asc" | "desc" = "desc",
		field: "createdAt" | "updatedAt" = "createdAt",
	): Prisma.OrderOrderByWithRelationInput {
		return { [field]: orderBy };
	}
}
