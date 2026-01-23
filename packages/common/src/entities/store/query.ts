import type { Prisma } from "@dukkani/db/prisma/generated";
import { CustomerQuery } from "../customer";
import { OrderQuery } from "../order";
import { ProductQuery } from "../product";
import { SalesMetricQuery } from "../sales-metric";
import { StorePlanQuery } from "../store-plan";
import { TeamMemberQuery } from "../team-member";
import { UserQuery } from "../user";

export type StoreSimpleDbData = Prisma.StoreGetPayload<{
	include: ReturnType<typeof StoreQuery.getSimpleInclude>;
}>;

export type StoreIncludeDbData = Prisma.StoreGetPayload<{
	include: ReturnType<typeof StoreQuery.getInclude>;
}>;

export type StoreClientSafeDbData = Prisma.StoreGetPayload<{
	include: ReturnType<typeof StoreQuery.getClientSafeInclude>;
}>;

export type StoreMinimalDbData = Prisma.StoreGetPayload<{
	select: ReturnType<typeof StoreQuery.getMinimalSelect>;
}>;

export type StorePublicDbData = Prisma.StoreGetPayload<{
	include: ReturnType<typeof StoreQuery.getPublicInclude>;
}>;

export class StoreQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.StoreInclude;
	}

	static getInclude() {
		return {
			...StoreQuery.getSimpleInclude(),
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
			...StoreQuery.getSimpleInclude(),
			storePlan: true,
		} satisfies Prisma.StoreInclude;
	}

	static getMinimalSelect() {
		return {
			id: true,
			slug: true,
			name: true,
			status: true,
		} satisfies Prisma.StoreSelect;
	}

	static getPublicInclude(options?: {
		productPage?: number;
		productLimit?: number;
	}) {
		const productPage = options?.productPage ?? 1;
		const productLimit = options?.productLimit ?? 20;
		const productSkip = (productPage - 1) * productLimit;

		return {
			...StoreQuery.getSimpleInclude(),
			storePlan: StorePlanQuery.getSimpleInclude(),
			owner: {
				select: {
					name: true,
					image: true,
				},
			},
			products: {
				where: ProductQuery.getPublishableWhere(),
				include: {
					images: {
						select: {
							url: true,
						},
					},
				},
				skip: productSkip,
				take: productLimit,
				orderBy: {
					createdAt: "desc",
				},
			},
		} satisfies Prisma.StoreInclude;
	}
}
