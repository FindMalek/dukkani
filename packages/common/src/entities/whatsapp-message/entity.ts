import type {
	WhatsAppMessageIncludeOutput,
	WhatsAppMessageSimpleOutput,
} from "../../schemas/whatsapp-message/output";
import { OrderEntity } from "../order/entity";
import type {
	WhatsAppMessageIncludeDbData,
	WhatsAppMessageSimpleDbData,
} from "./query";

export class WhatsAppMessageEntity {
	static getSimpleRo(
		entity: WhatsAppMessageSimpleDbData,
	): WhatsAppMessageSimpleOutput {
		return {
			id: entity.id,
			orderId: entity.orderId,
			content: entity.content,
			messageId: entity.messageId,
			status: entity.status,
			sentAt: entity.sentAt,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(
		entity: WhatsAppMessageIncludeDbData,
	): WhatsAppMessageIncludeOutput {
		return {
			...WhatsAppMessageEntity.getSimpleRo(entity),
			order: OrderEntity.getSimpleRo(entity.order),
		};
	}
}
