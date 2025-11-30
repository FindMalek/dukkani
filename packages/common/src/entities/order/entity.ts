import type {
	OrderSimpleOutput,
	OrderIncludeOutput,
} from "../../schemas/order/output";
import type { OrderSimpleDbData, OrderIncludeDbData } from "./query";
import { StoreEntity } from "../store/entity";
import { CustomerEntity } from "../customer/entity";
import { OrderItemEntity } from "../order-item/entity";
import { WhatsAppMessageEntity } from "../whatsapp-message/entity";

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
}
