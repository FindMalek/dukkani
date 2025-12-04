import type {
	OrderItemSimpleOutput,
	OrderItemIncludeOutput,
} from "../../schemas/order-item/output";
import type { OrderItemSimpleDbData, OrderItemIncludeDbData } from "./query";
import { ProductEntity } from "../product/entity";
import { OrderEntity } from "../order/entity";

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
			...OrderItemEntity.getSimpleRo(entity),
			order: OrderEntity.getSimpleRo(entity.order),
			product: ProductEntity.getSimpleRo(entity.product),
		};
	}
}
