import { type Prisma } from "@dukkani/db/prisma/generated";
import { UserQuery } from "../user";
import { StorePlanQuery } from "../store-plan";
import { ProductQuery } from "../product";
import { OrderQuery } from "../order";
import { CustomerQuery } from "../customer";
import { TeamMemberQuery } from "../team-member";
import { SalesMetricQuery } from "../sales-metric";

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
			owner: UserQuery.getSimpleInclude(),
			storePlan: StorePlanQuery.getSimpleInclude(),
			products: ProductQuery.getSimpleInclude(),
			orders: OrderQuery.getSimpleInclude(),
			customers: CustomerQuery.getSimpleInclude(),
			teamMembers: TeamMemberQuery.getSimpleInclude(),
			salesMetrics: SalesMetricQuery.getSimpleInclude(),
		} satisfies Prisma.StoreInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			storePlan: true,
		} satisfies Prisma.StoreInclude;
	}
}
