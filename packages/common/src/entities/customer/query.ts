export class CustomerQuery {
	static getSimpleInclude() {
		return {} as const;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: true,
			orders: true,
		} as const;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} as const;
	}
}

export interface CustomerSimpleDbData {
	id: string;
	name: string;
	phone: string;
	storeId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CustomerIncludeDbData extends CustomerSimpleDbData {
	store?: unknown;
	orders?: unknown[];
}

export interface CustomerClientSafeDbData extends CustomerSimpleDbData {}
