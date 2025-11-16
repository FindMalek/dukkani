import type { OrderItemSimpleOutput, OrderItemIncludeOutput } from "../../schemas/order-item/output";
import type { OrderItemSimpleDbData, OrderItemIncludeDbData } from "./query";

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

	static getRo(entity: OrderItemIncludeDbData): OrderItemIncludeOutput {
		return {
			...this.getSimpleRo(entity),
			order: entity.order ? entity.order : undefined,
			product: entity.product ? entity.product : undefined,
		};
	}
}

