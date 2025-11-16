import { type Prisma } from "@dukkani/db/prisma/generated";

export type StorePlanSimpleDbData = Prisma.StorePlanGetPayload<{
	include: ReturnType<typeof StorePlanQuery.getSimpleInclude>;
}>;

export type StorePlanIncludeDbData = Prisma.StorePlanGetPayload<{
	include: ReturnType<typeof StorePlanQuery.getInclude>;
}>;

export type StorePlanClientSafeDbData = Prisma.StorePlanGetPayload<{
	include: ReturnType<typeof StorePlanQuery.getClientSafeInclude>;
}>;


export class StorePlanQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.StorePlanInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: true,
		} satisfies Prisma.StorePlanInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} satisfies Prisma.StorePlanInclude;
	}
}

