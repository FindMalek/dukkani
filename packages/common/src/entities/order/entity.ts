import type { OrderSimpleOutput, OrderIncludeOutput } from "../../schemas/order/output";
import type { OrderSimpleDbData, OrderIncludeDbData } from "./query";

export class OrderEntity {
	static getSimpleRo(entity: OrderSimpleDbData): OrderSimpleOutput {
		return {
			id: entity.id,
			status: entity.status,
			customerName: entity.customerName,
			customerPhone: entity.customerPhone,
			address: entity.address,
			notes: entity.notes,
			storeId: entity.storeId,
			customerId: entity.customerId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: OrderIncludeDbData): OrderIncludeOutput {
		return {
			...this.getSimpleRo(entity),
			store: entity.store ? entity.store : undefined,
			customer: entity.customer ? entity.customer : undefined,
			orderItems: entity.orderItems?.map((item) => item) ?? [],
			whatsappMessages: entity.whatsappMessages?.map((msg) => msg) ?? [],
		};
	}
}

