import { type Prisma } from "@dukkani/db/prisma/generated";
import { StoreQuery } from "../store/query";
export type SalesMetricSimpleDbData = Prisma.SalesMetricGetPayload<{
	include: ReturnType<typeof SalesMetricQuery.getSimpleInclude>;
}>;

export type SalesMetricIncludeDbData = Prisma.SalesMetricGetPayload<{
	include: ReturnType<typeof SalesMetricQuery.getInclude>;
}>;

export type SalesMetricClientSafeDbData = Prisma.SalesMetricGetPayload<{
	include: ReturnType<typeof SalesMetricQuery.getClientSafeInclude>;
}>;

export class SalesMetricQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.SalesMetricInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: StoreQuery.getSimpleInclude(),
		} satisfies Prisma.SalesMetricInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} satisfies Prisma.SalesMetricInclude;
	}
}
