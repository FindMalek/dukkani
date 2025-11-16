export class ProductQuery {
	static getSimpleInclude() {
		return {} as const;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: true,
			images: true,
			orderItems: true,
		} as const;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			images: true,
		} as const;
	}
}

export interface ProductSimpleDbData {
	id: string;
	name: string;
	description: string | null;
	price: number | string; // Can be Decimal from Prisma
	stock: number;
	published: boolean;
	storeId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductIncludeDbData extends ProductSimpleDbData {
	store?: unknown;
	images?: unknown[];
	orderItems?: unknown[];
}

export interface ProductClientSafeDbData extends ProductSimpleDbData {
	images?: unknown[];
}
