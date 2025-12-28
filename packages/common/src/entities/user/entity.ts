import type { UserSimpleOutput } from "../../schemas/user/output";
import type { UserSimpleDbData } from "./query";

export class UserEntity {
	static getSimpleRo(entity: UserSimpleDbData): UserSimpleOutput {
		return {
			id: entity.id,
			name: entity.name,
			email: entity.email,
			emailVerified: entity.emailVerified,
			image: entity.image,
			onboardingStep: entity.onboardingStep,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}
}
