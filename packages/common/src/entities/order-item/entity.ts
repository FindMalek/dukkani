import type {
	OrderItemSimpleOutput,
	OrderItemWithProductOutput,
} from "../../schemas/order-item/output";
import type {
	OrderItemIncludeDbData,
	OrderItemSimpleDbData,
	OrderItemWithProductDbData,
} from "./query";

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

	static getRo(entity: OrderItemIncludeDbData): OrderItemWithProductOutput {
		return {
			...OrderItemEntity.getSimpleRo(entity),
			product: entity.product
				? {
						id: entity.product.id,
						name: entity.product.name,
					}
				: undefined,
		};
	}

	static getRoWithProduct(
		entity: OrderItemWithProductDbData,
	): OrderItemWithProductOutput {
		return {
			...OrderItemEntity.getSimpleRo(entity),
			product: entity.product
				? {
						id: entity.product.id,
						name: entity.product.name,
					}
				: undefined,
		};
	}
}
