import type { OrderItemSimpleOutput } from "../../schemas/order-item/output";
import type { OrderItemSimpleDbData } from "./query";

export class OrderItemEntity {
	static getSimpleRo(entity: OrderItemSimpleDbData): OrderItemSimpleOutput {
		return {
			id: entity.id,
			orderId: entity.orderId,
			productId: entity.productId,
			quantity: entity.quantity,
			price: Number(entity.price),
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}
}
