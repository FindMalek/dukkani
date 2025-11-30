import type { Prisma } from "@dukkani/db/prisma/generated";

export type OrderItemSimpleDbData = Prisma.OrderItemGetPayload<{
	include: ReturnType<typeof OrderItemQuery.getSimpleInclude>;
}>;

export type OrderItemIncludeDbData = Prisma.OrderItemGetPayload<{
	include: ReturnType<typeof OrderItemQuery.getInclude>;
}>;

export type OrderItemClientSafeDbData = Prisma.OrderItemGetPayload<{
	include: ReturnType<typeof OrderItemQuery.getClientSafeInclude>;
}>;

export class OrderItemQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.OrderItemInclude;
	}

	static getInclude() {
		return {
			...OrderItemQuery.getSimpleInclude(),
			order: true,
			product: true,
		} satisfies Prisma.OrderItemInclude;
	}

	static getClientSafeInclude() {
		return {
			...OrderItemQuery.getSimpleInclude(),
			product: true,
		} satisfies Prisma.OrderItemInclude;
	}

	/**
	 * Get select object for revenue calculations (only quantity and price)
	 */
	static getRevenueSelect(): { quantity: true; price: true } {
		return {
			quantity: true,
			price: true,
		};
	}
}
