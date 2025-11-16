import type {
	TeamMemberSimpleOutput,
	TeamMemberIncludeOutput,
} from "../../schemas/team-member/output";
import type { TeamMemberSimpleDbData, TeamMemberIncludeDbData } from "./query";

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
			...this.getSimpleRo(entity),
			user: entity.user,
			store: entity.store,
		};
	}
}
