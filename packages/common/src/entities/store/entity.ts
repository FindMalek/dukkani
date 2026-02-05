import {
	type StoreCategory,
	StoreNotificationMethod,
	type StoreTheme,
} from "@dukkani/db/prisma/generated/enums";
import {
	LIST_STORE_THEMES,
	type StoreThemeInfer,
	storeThemeEnum,
} from "../../schemas/enums";
import type {
	StoreIncludeOutput,
	StorePublicOutput,
	StorePublicSimpleOutput,
	StoreSafeOutput,
	StoreSimpleOutput,
} from "../../schemas/store/output";
import { ProductEntity } from "../product/entity";
import { SalesMetricEntity } from "../sales-metric/entity";
import { StorePlanEntity } from "../store-plan/entity";
import { TeamMemberEntity } from "../team-member/entity";
import { UserEntity } from "../user/entity";
import type {
	StoreClientSafeDbData,
	StoreIncludeDbData,
	StorePublicDbData,
	StorePublicSimpleDbData,
	StoreSimpleDbData,
} from "./query";

export class StoreEntity {
	/**
	 * Get safe read-only output (for public endpoints)
	 * Excludes sensitive fields like ownerId
	 */
	static getSafeRo(entity: StoreClientSafeDbData): StoreSafeOutput {
		return {
			id: entity.id,
			slug: entity.slug,
			name: entity.name,
			description: entity.description,
			whatsappNumber: entity.whatsappNumber,
			category: entity.category,
			status: entity.status,
			theme: entity.theme,
			notificationMethod: entity.notificationMethod,
			supportedPaymentMethods: entity.supportedPaymentMethods,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
			storePlan: entity.storePlan
				? StorePlanEntity.getSimpleRo(entity.storePlan)
				: undefined,
		};
	}

	static getSimpleRo(entity: StoreSimpleDbData): StoreSimpleOutput {
		return {
			id: entity.id,
			slug: entity.slug,
			name: entity.name,
			description: entity.description,
			whatsappNumber: entity.whatsappNumber,
			category: entity.category,
			status: entity.status,
			theme: entity.theme,
			notificationMethod: entity.notificationMethod,
			supportedPaymentMethods: entity.supportedPaymentMethods,
			ownerId: entity.ownerId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	/**
	 * Get minimal store output for product detail pages
	 * Only includes essential fields needed for store info card
	 */
	static getPublicSimpleRo(
		entity: StorePublicSimpleDbData,
	): StorePublicSimpleOutput {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			owner: entity.owner ? UserEntity.getSimpleRo(entity.owner) : undefined,
		};
	}

	/**
	 * Get public read-only output (for public storefronts)
	 * Includes owner (limited fields) and products (public only)
	 */
	static getPublicRo(entity: StorePublicDbData): StorePublicOutput {
		return {
			id: entity.id,
			slug: entity.slug,
			name: entity.name,
			description: entity.description,
			whatsappNumber: entity.whatsappNumber,
			category: entity.category,
			theme: entity.theme,
			status: entity.status,
			supportedPaymentMethods: entity.supportedPaymentMethods,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
			storePlan: entity.storePlan
				? StorePlanEntity.getSimpleRo(entity.storePlan)
				: undefined,
			owner: entity.owner
				? UserEntity.getSimpleSelectRo(entity.owner)
				: undefined,
			products: entity.products?.map(ProductEntity.getPublicRo),
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
	 * Get translation key for theme or category options
	 */
	private static getOptionTranslationKey<
		E extends string,
		P extends "theme" | "category",
		S extends "label" | "description",
	>(enumValue: E, prefix: P, suffix: S): `${P}.options.${Lowercase<E>}.${S}` {
		return `${prefix}.options.${enumValue.toLowerCase() as Lowercase<E>}.${suffix}`;
	}

	/**
	 * Get translation key for theme option label
	 */
	static getThemeLabelKey(
		theme: StoreTheme,
	): `theme.options.${Lowercase<StoreTheme>}.label` {
		return StoreEntity.getOptionTranslationKey(theme, "theme", "label");
	}

	/**
	 * Get translation key for theme option description
	 */
	static getThemeDescriptionKey(
		theme: StoreTheme,
	): `theme.options.${Lowercase<StoreTheme>}.description` {
		return StoreEntity.getOptionTranslationKey(theme, "theme", "description");
	}

	/**
	 * Get translation key for category option label
	 */
	static getCategoryLabelKey(
		category: StoreCategory,
	): `category.options.${Lowercase<StoreCategory>}.label` {
		return StoreEntity.getOptionTranslationKey(category, "category", "label");
	}

	/**
	 * Get translation key for category option description
	 */
	static getCategoryDescriptionKey(
		category: StoreCategory,
	): `category.options.${Lowercase<StoreCategory>}.description` {
		return StoreEntity.getOptionTranslationKey(
			category,
			"category",
			"description",
		);
	}

	/**
	 * Convert string value to StoreTheme enum
	 * Supports Form value -> Zod schema -> Prisma enum conversion
	 */
	static valueToTheme(value: string): StoreThemeInfer {
		if (LIST_STORE_THEMES.includes(value as StoreTheme)) {
			return value as StoreTheme;
		}
		return storeThemeEnum.MODERN;
	}
}
