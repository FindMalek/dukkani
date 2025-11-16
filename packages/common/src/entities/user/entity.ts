import type { UserSimpleOutput, UserIncludeOutput } from "../../schemas/user/output";
import type { UserSimpleDbData, UserIncludeDbData } from "./query";

export class UserEntity {
	static getSimpleRo(entity: UserSimpleDbData): UserSimpleOutput {
		return {
			id: entity.id,
			name: entity.name,
			email: entity.email,
			emailVerified: entity.emailVerified,
			image: entity.image,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: UserIncludeDbData): UserIncludeOutput {
		return {
			...this.getSimpleRo(entity),
			stores: entity.stores ?? [],
			teamMembers: entity.teamMembers ?? [],
		};
	}
}
