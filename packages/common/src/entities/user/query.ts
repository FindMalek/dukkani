import { type Prisma } from "@dukkani/db/prisma/generated";

export type UserSimpleDbData = Prisma.UserGetPayload<{
	include: ReturnType<typeof UserQuery.getSimpleInclude>;
}>;

export type UserIncludeDbData = Prisma.UserGetPayload<{
	include: ReturnType<typeof UserQuery.getInclude>;
}>;

export type UserClientSafeDbData = Prisma.UserGetPayload<{
	include: ReturnType<typeof UserQuery.getClientSafeInclude>;
}>;

export class UserQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.UserInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			stores: true,
			teamMembers: true,
		} satisfies Prisma.UserInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} satisfies Prisma.UserInclude;
	}
}
