import type {
	OrderIncludeOutput,
	OrderSimpleOutput,
} from "../../schemas/order/output";
import { CustomerEntity } from "../customer/entity";
import { OrderItemEntity } from "../order-item/entity";
import { StoreEntity } from "../store/entity";
import { WhatsAppMessageEntity } from "../whatsapp-message/entity";
import type {
	OrderIncludeDbData,
	OrderIncludeWithProductDbData,
	OrderSimpleDbData,
} from "./query";

export class OrderEntity {
	static getSimpleRo(entity: OrderSimpleDbData): OrderSimpleOutput {
		return {
			id: entity.id,
			status: entity.status,
			paymentMethod: entity.paymentMethod,
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
			...OrderEntity.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
			customer: entity.customer
				? CustomerEntity.getSimpleRo(entity.customer)
				: undefined,
			orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
			whatsappMessages: entity.whatsappMessages.map(
				WhatsAppMessageEntity.getSimpleRo,
			),
		};
	}

	static getRoWithProduct(
		entity: OrderIncludeWithProductDbData,
	): OrderIncludeOutput {
		return {
			...OrderEntity.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
			customer: entity.customer
				? CustomerEntity.getSimpleRo(entity.customer)
				: undefined,
			orderItems: entity.orderItems.map(OrderItemEntity.getRoWithProduct),
			whatsappMessages: entity.whatsappMessages.map(
				WhatsAppMessageEntity.getSimpleRo,
			),
		};
	}
}
