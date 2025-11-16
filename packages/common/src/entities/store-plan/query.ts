import type { StorePlanType } from "../../schemas/enums";

export class StorePlanQuery {
	static getSimpleInclude() {
		return {} as const;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: true,
		} as const;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} as const;
	}
}

export interface StorePlanSimpleDbData {
	id: string;
	planType: StorePlanType;
	orderLimit: number;
	orderCount: number;
	resetAt: Date | null;
	storeId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface StorePlanIncludeDbData extends StorePlanSimpleDbData {
	store?: unknown;
}

export interface StorePlanClientSafeDbData extends StorePlanSimpleDbData {}
