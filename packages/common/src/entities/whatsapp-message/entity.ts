import type { WhatsAppMessageSimpleOutput, WhatsAppMessageIncludeOutput } from "../../schemas/whatsapp-message/output";
import type { WhatsAppMessageSimpleDbData, WhatsAppMessageIncludeDbData } from "./query";

export class WhatsAppMessageEntity {
	static getSimpleRo(entity: WhatsAppMessageSimpleDbData): WhatsAppMessageSimpleOutput {
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

	static getRo(entity: WhatsAppMessageIncludeDbData): WhatsAppMessageIncludeOutput {
		return {
			...this.getSimpleRo(entity),
			order: entity.order,
		};
	}
}

