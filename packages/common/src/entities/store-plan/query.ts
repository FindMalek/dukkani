import type { Prisma } from "@dukkani/db/prisma/generated";
import { StoreQuery } from "../store/query";

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
			...StorePlanQuery.getSimpleInclude(),
			store: StoreQuery.getSimpleInclude(),
		} satisfies Prisma.StorePlanInclude;
	}

	static getClientSafeInclude() {
		return {
			...StorePlanQuery.getSimpleInclude(),
		} satisfies Prisma.StorePlanInclude;
	}
}
