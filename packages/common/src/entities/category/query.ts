import type { Prisma } from "@dukkani/db/prisma/generated";

export type CategorySimpleDbData = Prisma.CategoryGetPayload<{
	include: ReturnType<typeof CategoryQuery.getSimpleInclude>;
}>;

export class CategoryQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.CategoryInclude;
	}
}
