import type {
	OrderItemIncludeOutput,
	OrderItemSimpleOutput,
} from "../../schemas/order-item/output";
import { OrderEntity } from "../order/entity";
import { ProductEntity } from "../product/entity";
import type { OrderItemIncludeDbData, OrderItemSimpleDbData } from "./query";

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
