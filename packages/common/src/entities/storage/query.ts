import { type Prisma } from "@dukkani/db/prisma/generated";

export type StorageFileSimpleDbData = Prisma.StorageFileGetPayload<{
	include: ReturnType<typeof StorageFileQuery.getSimpleInclude>;
}>;

export type StorageFileIncludeDbData = Prisma.StorageFileGetPayload<{
	include: ReturnType<typeof StorageFileQuery.getInclude>;
}>;

export class StorageFileQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.StorageFileInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			variants: true,
		} satisfies Prisma.StorageFileInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			variants: true,
		} satisfies Prisma.StorageFileInclude;
	}
}
