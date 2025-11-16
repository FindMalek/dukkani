import { type Prisma } from "@dukkani/db/prisma/generated";

export type CustomerSimpleDbData = Prisma.CustomerGetPayload<{
	include: ReturnType<typeof CustomerQuery.getSimpleInclude>;
}>;

export type CustomerIncludeDbData = Prisma.CustomerGetPayload<{
	include: ReturnType<typeof CustomerQuery.getInclude>;
}>;

export type CustomerClientSafeDbData = Prisma.CustomerGetPayload<{
	include: ReturnType<typeof CustomerQuery.getClientSafeInclude>;
}>;

export class CustomerQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.CustomerInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: true,
			orders: true,
		} satisfies Prisma.CustomerInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} satisfies Prisma.CustomerInclude;
	}
}
