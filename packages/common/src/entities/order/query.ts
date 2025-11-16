import type { OrderStatus } from "../../schemas/enums";

export class OrderQuery {
	static getSimpleInclude() {
		return {} as const;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: true,
			customer: true,
			orderItems: true,
			whatsappMessages: true,
		} as const;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			orderItems: true,
		} as const;
	}
}

export interface OrderSimpleDbData {
	id: string;
	status: OrderStatus;
	customerName: string;
	customerPhone: string;
	address: string | null;
	notes: string | null;
	storeId: string;
	customerId: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderIncludeDbData extends OrderSimpleDbData {
	store?: unknown;
	customer?: unknown;
	orderItems?: unknown[];
	whatsappMessages?: unknown[];
}

export interface OrderClientSafeDbData extends OrderSimpleDbData {
	orderItems?: unknown[];
}
