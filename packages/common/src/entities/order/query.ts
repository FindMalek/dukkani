import { type Prisma } from "@dukkani/db/prisma/generated";

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
			...this.getSimpleInclude(),
			store: true,
			customer: true,
			orderItems: true,
			whatsappMessages: true,
		} satisfies Prisma.OrderInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			orderItems: true,
		} satisfies Prisma.OrderInclude;
	}
}
