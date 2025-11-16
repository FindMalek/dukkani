import type { StoreCategory, StoreTheme } from "../../schemas/enums";

/**
 * Store query helpers - Define include objects for Prisma queries
 */
export class StoreQuery {
	static getSimpleInclude() {
		return {} as const;
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
		} as const;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			storePlan: true,
		} as const;
	}
}

export interface StoreSimpleDbData {
	id: string;
	slug: string;
	name: string;
	description: string | null;
	whatsappNumber: string | null;
	category: StoreCategory | null;
	theme: StoreTheme | null;
	ownerId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface StoreIncludeDbData extends StoreSimpleDbData {
	owner?: unknown;
	storePlan?: unknown;
	products?: unknown[];
	orders?: unknown[];
	customers?: unknown[];
	teamMembers?: unknown[];
	salesMetrics?: unknown[];
}

export interface StoreClientSafeDbData extends StoreSimpleDbData {
	storePlan?: unknown;
}
