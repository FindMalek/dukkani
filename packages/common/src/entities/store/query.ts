import { type Prisma } from "@dukkani/db/prisma/generated";

export type StoreSimpleDbData = Prisma.StoreGetPayload<{
	include: ReturnType<typeof StoreQuery.getSimpleInclude>;
}>;

export type StoreIncludeDbData = Prisma.StoreGetPayload<{
	include: ReturnType<typeof StoreQuery.getInclude>;
}>;

export type StoreClientSafeDbData = Prisma.StoreGetPayload<{
	include: ReturnType<typeof StoreQuery.getClientSafeInclude>;
}>;


export class StoreQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.StoreInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			owner: true,
			storePlan: true,
			products: true,
			orders: true,
			customers: true,
			teamMembers: true,
			salesMetrics: true,
		} satisfies Prisma.StoreInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			storePlan: true,
		} satisfies Prisma.StoreInclude;
	}
}

