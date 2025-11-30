import type {
	TeamMemberSimpleOutput,
	TeamMemberIncludeOutput,
} from "../../schemas/team-member/output";
import type { TeamMemberSimpleDbData, TeamMemberIncludeDbData } from "./query";
import { UserEntity } from "../user/entity";
import { StoreEntity } from "../store/entity";

export class TeamMemberEntity {
	static getSimpleRo(entity: TeamMemberSimpleDbData): TeamMemberSimpleOutput {
		return {
			id: entity.id,
			userId: entity.userId,
			storeId: entity.storeId,
			role: entity.role,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: TeamMemberIncludeDbData): TeamMemberIncludeOutput {
		return {
			...TeamMemberEntity.getSimpleRo(entity),
			user: UserEntity.getSimpleRo(entity.user),
			store: StoreEntity.getSimpleRo(entity.store),
		};
	}
}
