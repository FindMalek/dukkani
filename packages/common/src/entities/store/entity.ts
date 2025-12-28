import { StoreNotificationMethod } from "@dukkani/db/prisma/generated/enums";
import type {
	StoreIncludeOutput,
	StoreSimpleOutput,
} from "../../schemas/store/output";
import { ProductEntity } from "../product/entity";
import { SalesMetricEntity } from "../sales-metric/entity";
import { StorePlanEntity } from "../store-plan/entity";
import { TeamMemberEntity } from "../team-member/entity";
import { UserEntity } from "../user/entity";
import type { StoreIncludeDbData, StoreSimpleDbData } from "./query";

export class StoreEntity {
	static getSimpleRo(entity: StoreSimpleDbData): StoreSimpleOutput {
		return {
			id: entity.id,
			slug: entity.slug,
			name: entity.name,
			description: entity.description,
			whatsappNumber: entity.whatsappNumber,
			category: entity.category,
			theme: entity.theme,
			notificationMethod: entity.notificationMethod,
			ownerId: entity.ownerId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: StoreIncludeDbData): StoreIncludeOutput {
		return {
			...StoreEntity.getSimpleRo(entity),
			owner: UserEntity.getSimpleRo(entity.owner),
			storePlan: entity.storePlan
				? StorePlanEntity.getSimpleRo(entity.storePlan)
				: undefined,
			products: entity.products.map(ProductEntity.getSimpleRo),
			teamMembers: entity.teamMembers.map(TeamMemberEntity.getSimpleRo),
			salesMetrics: entity.salesMetrics.map(SalesMetricEntity.getSimpleRo),
		};
	}

	/**
	 * Convert StoreNotificationMethod enum to string value for forms/API
	 * Supports Prisma enum -> Zod schema -> Form value conversion
	 */
	static notificationMethodToValue(
		method: StoreNotificationMethod | null | undefined,
	): string {
		if (!method) return StoreNotificationMethod.EMAIL;
		return method;
	}

	/**
	 * Convert string value to StoreNotificationMethod enum
	 * Supports Form value -> Zod schema -> Prisma enum conversion
	 */
	static valueToNotificationMethod(value: string): StoreNotificationMethod {
		if (
			value === StoreNotificationMethod.EMAIL ||
			value === StoreNotificationMethod.TELEGRAM ||
			value === StoreNotificationMethod.BOTH
		) {
			return value;
		}
		return StoreNotificationMethod.EMAIL;
	}

	/**
	 * Get translated label for notification method (for next-intl)
	 * @param method - The notification method enum value
	 * @param t - Translation function from next-intl useTranslations
	 */
	static getNotificationMethodLabel(
		method: StoreNotificationMethod | null | undefined,
		t: (key: string) => string,
	): string {
		const key = method || StoreNotificationMethod.EMAIL;
		return t(
			`onboarding.storeSetup.notifications.options.${key.toLowerCase()}.label`,
		);
	}

	/**
	 * Get translated description for notification method (for next-intl)
	 * @param method - The notification method enum value
	 * @param t - Translation function from next-intl useTranslations
	 */
	static getNotificationMethodDescription(
		method: StoreNotificationMethod | null | undefined,
		t: (key: string) => string,
	): string {
		const key = method || StoreNotificationMethod.EMAIL;
		return t(
			`onboarding.storeSetup.notifications.options.${key.toLowerCase()}.description`,
		);
	}
}
