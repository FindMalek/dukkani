export class OrderItemQuery {
	static getSimpleInclude() {
		return {} as const;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			order: true,
			product: true,
		} as const;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			product: true,
		} as const;
	}
}

export interface OrderItemSimpleDbData {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	price: number | string; // Can be Decimal from Prisma
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItemIncludeDbData extends OrderItemSimpleDbData {
	order?: unknown;
	product?: unknown;
}

export interface OrderItemClientSafeDbData extends OrderItemSimpleDbData {
	product?: unknown;
}
