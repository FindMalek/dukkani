import type { Prisma } from "@dukkani/db/prisma/generated";

export type ImageSimpleDbData = Prisma.ImageGetPayload<{
	include: ReturnType<typeof ImageQuery.getSimpleInclude>;
}>;

export type ImageIncludeDbData = Prisma.ImageGetPayload<{
	include: ReturnType<typeof ImageQuery.getInclude>;
}>;

export type ImageClientSafeDbData = Prisma.ImageGetPayload<{
	include: ReturnType<typeof ImageQuery.getClientSafeInclude>;
}>;

export class ImageQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.ImageInclude;
	}

	static getInclude() {
		return {
			...ImageQuery.getSimpleInclude(),
			product: true,
		} satisfies Prisma.ImageInclude;
	}

	static getClientSafeInclude() {
		return {
			...ImageQuery.getSimpleInclude(),
		} satisfies Prisma.ImageInclude;
	}

	static getPublicSelect() {
		return {
			url: true,
		} satisfies Prisma.ImageSelect;
	}
}
