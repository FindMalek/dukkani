import type {
	TeamMemberIncludeOutput,
	TeamMemberSimpleOutput,
} from "../../schemas/team-member/output";
import { UserEntity } from "../user/entity";
import type { TeamMemberIncludeDbData, TeamMemberSimpleDbData } from "./query";

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
		};
	}
}
