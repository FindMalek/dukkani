/**
 * User query helpers - Define include objects for Prisma queries
 * These return plain objects that can be used with Prisma's include option
 */

export class UserQuery {
	static getSimpleInclude() {
		return {} as const;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			stores: true,
			teamMembers: true,
		} as const;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} as const;
	}
}

/**
 * Type definitions for database entities
 * These match the Prisma schema structure
 */
export interface UserSimpleDbData {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserIncludeDbData extends UserSimpleDbData {
	stores?: unknown[];
	teamMembers?: unknown[];
}

export interface UserClientSafeDbData extends UserSimpleDbData {}
