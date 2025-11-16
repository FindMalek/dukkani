import { type Prisma } from "@dukkani/db/prisma/generated";

export type WhatsAppMessageSimpleDbData = Prisma.WhatsAppMessageGetPayload<{
	include: ReturnType<typeof WhatsAppMessageQuery.getSimpleInclude>;
}>;

export type WhatsAppMessageIncludeDbData = Prisma.WhatsAppMessageGetPayload<{
	include: ReturnType<typeof WhatsAppMessageQuery.getInclude>;
}>;

export type WhatsAppMessageClientSafeDbData = Prisma.WhatsAppMessageGetPayload<{
	include: ReturnType<typeof WhatsAppMessageQuery.getClientSafeInclude>;
}>;

export class WhatsAppMessageQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.WhatsAppMessageInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			order: true,
		} satisfies Prisma.WhatsAppMessageInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} satisfies Prisma.WhatsAppMessageInclude;
	}
}
