import type { Prisma } from "@dukkani/db/prisma/generated";
import { StoreQuery } from "../store/query";
import { TeamMemberQuery } from "../team-member/query";

export type UserSimpleDbData = Prisma.UserGetPayload<{
	include: ReturnType<typeof UserQuery.getSimpleInclude>;
}>;

export type UserIncludeDbData = Prisma.UserGetPayload<{
	include: ReturnType<typeof UserQuery.getInclude>;
}>;

export type UserClientSafeDbData = Prisma.UserGetPayload<{
	include: ReturnType<typeof UserQuery.getClientSafeInclude>;
}>;

export type UserSimpleSelectDbData = Prisma.UserGetPayload<{
	select: ReturnType<typeof UserQuery.getSimpleSelect>;
}>;

export class UserQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.UserInclude;
	}

	static getSimpleSelect() {
		return {
			id: true,
			name: true,
			image: true,
		} satisfies Prisma.UserSelect;
	}

	static getInclude() {
		return {
			...UserQuery.getSimpleInclude(),
			stores: StoreQuery.getSimpleInclude(),
			teamMembers: TeamMemberQuery.getSimpleInclude(),
		} satisfies Prisma.UserInclude;
	}

	static getClientSafeInclude() {
		return {
			...UserQuery.getSimpleInclude(),
		} satisfies Prisma.UserInclude;
	}

	static getMinimalSelect() {
		return {
			id: true,
		} satisfies Prisma.UserSelect;
	}
}
