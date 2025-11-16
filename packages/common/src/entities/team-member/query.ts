import { type Prisma } from "@dukkani/db/prisma/generated";

export type TeamMemberSimpleDbData = Prisma.TeamMemberGetPayload<{
	include: ReturnType<typeof TeamMemberQuery.getSimpleInclude>;
}>;

export type TeamMemberIncludeDbData = Prisma.TeamMemberGetPayload<{
	include: ReturnType<typeof TeamMemberQuery.getInclude>;
}>;

export type TeamMemberClientSafeDbData = Prisma.TeamMemberGetPayload<{
	include: ReturnType<typeof TeamMemberQuery.getClientSafeInclude>;
}>;

export class TeamMemberQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.TeamMemberInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			user: true,
			store: true,
		} satisfies Prisma.TeamMemberInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} satisfies Prisma.TeamMemberInclude;
	}
}
