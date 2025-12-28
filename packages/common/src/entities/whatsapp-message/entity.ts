import type { WhatsAppMessageSimpleOutput } from "../../schemas/whatsapp-message/output";
import type { WhatsAppMessageSimpleDbData } from "./query";

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
}
