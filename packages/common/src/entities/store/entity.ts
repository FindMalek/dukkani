import {
	StoreCategory,
	StoreNotificationMethod,
	StoreTheme,
} from "@dukkani/db/prisma/generated/enums";
import type {
	StoreIncludeOutput,
	StorePublicOutput,
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
			theme: entity.theme,
			notificationMethod: entity.notificationMethod,
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
			theme: entity.theme,
			notificationMethod: entity.notificationMethod,
			ownerId: entity.ownerId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
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
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
			storePlan: entity.storePlan
				? StorePlanEntity.getSimpleRo(entity.storePlan)
				: undefined,
			owner: entity.owner
				? {
						name: entity.owner.name,
						image: entity.owner.image,
					}
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
	 * Get translation key for theme option label
	 */
	static getThemeLabelKey(
		theme: StoreTheme,
	):
		| "theme.options.light.label"
		| "theme.options.dark.label"
		| "theme.options.minimal.label"
		| "theme.options.modern.label"
		| "theme.options.classic.label" {
		const keyMap: Record<
			StoreTheme,
			| "theme.options.light.label"
			| "theme.options.dark.label"
			| "theme.options.minimal.label"
			| "theme.options.modern.label"
			| "theme.options.classic.label"
		> = {
			[StoreTheme.LIGHT]: "theme.options.light.label",
			[StoreTheme.DARK]: "theme.options.dark.label",
			[StoreTheme.MINIMAL]: "theme.options.minimal.label",
			[StoreTheme.MODERN]: "theme.options.modern.label",
			[StoreTheme.CLASSIC]: "theme.options.classic.label",
		};
		return keyMap[theme];
	}

	/**
	 * Get translation key for theme option description
	 */
	static getThemeDescriptionKey(
		theme: StoreTheme,
	):
		| "theme.options.light.description"
		| "theme.options.dark.description"
		| "theme.options.minimal.description"
		| "theme.options.modern.description"
		| "theme.options.classic.description" {
		const keyMap: Record<
			StoreTheme,
			| "theme.options.light.description"
			| "theme.options.dark.description"
			| "theme.options.minimal.description"
			| "theme.options.modern.description"
			| "theme.options.classic.description"
		> = {
			[StoreTheme.LIGHT]: "theme.options.light.description",
			[StoreTheme.DARK]: "theme.options.dark.description",
			[StoreTheme.MINIMAL]: "theme.options.minimal.description",
			[StoreTheme.MODERN]: "theme.options.modern.description",
			[StoreTheme.CLASSIC]: "theme.options.classic.description",
		};
		return keyMap[theme];
	}

	/**
	 * Get translation key for category option label
	 */
	static getCategoryLabelKey(
		category: StoreCategory,
	):
		| "category.options.fashion.label"
		| "category.options.electronics.label"
		| "category.options.food.label"
		| "category.options.home.label"
		| "category.options.beauty.label"
		| "category.options.sports.label"
		| "category.options.books.label"
		| "category.options.toys.label"
		| "category.options.other.label" {
		const keyMap: Record<
			StoreCategory,
			| "category.options.fashion.label"
			| "category.options.electronics.label"
			| "category.options.food.label"
			| "category.options.home.label"
			| "category.options.beauty.label"
			| "category.options.sports.label"
			| "category.options.books.label"
			| "category.options.toys.label"
			| "category.options.other.label"
		> = {
			[StoreCategory.FASHION]: "category.options.fashion.label",
			[StoreCategory.ELECTRONICS]: "category.options.electronics.label",
			[StoreCategory.FOOD]: "category.options.food.label",
			[StoreCategory.HOME]: "category.options.home.label",
			[StoreCategory.BEAUTY]: "category.options.beauty.label",
			[StoreCategory.SPORTS]: "category.options.sports.label",
			[StoreCategory.BOOKS]: "category.options.books.label",
			[StoreCategory.TOYS]: "category.options.toys.label",
			[StoreCategory.OTHER]: "category.options.other.label",
		};
		return keyMap[category];
	}

	/**
	 * Get translation key for category option description
	 */
	static getCategoryDescriptionKey(
		category: StoreCategory,
	):
		| "category.options.fashion.description"
		| "category.options.electronics.description"
		| "category.options.food.description"
		| "category.options.home.description"
		| "category.options.beauty.description"
		| "category.options.sports.description"
		| "category.options.books.description"
		| "category.options.toys.description"
		| "category.options.other.description" {
		const keyMap: Record<
			StoreCategory,
			| "category.options.fashion.description"
			| "category.options.electronics.description"
			| "category.options.food.description"
			| "category.options.home.description"
			| "category.options.beauty.description"
			| "category.options.sports.description"
			| "category.options.books.description"
			| "category.options.toys.description"
			| "category.options.other.description"
		> = {
			[StoreCategory.FASHION]: "category.options.fashion.description",
			[StoreCategory.ELECTRONICS]: "category.options.electronics.description",
			[StoreCategory.FOOD]: "category.options.food.description",
			[StoreCategory.HOME]: "category.options.home.description",
			[StoreCategory.BEAUTY]: "category.options.beauty.description",
			[StoreCategory.SPORTS]: "category.options.sports.description",
			[StoreCategory.BOOKS]: "category.options.books.description",
			[StoreCategory.TOYS]: "category.options.toys.description",
			[StoreCategory.OTHER]: "category.options.other.description",
		};
		return keyMap[category];
	}
}
