import type {
	UserSimpleOutput,
	UserIncludeOutput,
} from "../../schemas/user/output";
import { StoreEntity } from "../store/entity";
import { TeamMemberEntity } from "../team-member/entity";
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
			stores: entity.stores.map(StoreEntity.getSimpleRo),
			teamMembers: entity.teamMembers.map(TeamMemberEntity.getSimpleRo),
		};
	}
}
