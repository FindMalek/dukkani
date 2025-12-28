import {
	HealthStatus,
	OrderStatus,
	StorageFileVariantType,
	StoreCategory,
	StoreNotificationMethod,
	StorePlanType,
	StoreTheme,
	TeamMemberRole,
	UserOnboardingStep,
	WhatsAppMessageStatus,
} from "@dukkani/db/prisma/generated/enums";
import { z } from "zod";

/**
 * Order Status Enum
 */
export { OrderStatus };
export const orderStatusSchema = z.nativeEnum(OrderStatus);
export const orderStatusEnum = orderStatusSchema.enum;
export const LIST_ORDER_STATUSES = Object.values(OrderStatus);
export type OrderStatusInfer = z.infer<typeof orderStatusSchema>;

/**
 * WhatsApp Message Status Enum
 */
export { WhatsAppMessageStatus };
export const whatsappMessageStatusSchema = z.nativeEnum(WhatsAppMessageStatus);
export const whatsappMessageStatusEnum = whatsappMessageStatusSchema.enum;
export const LIST_WHATSAPP_MESSAGE_STATUSES = Object.values(
	WhatsAppMessageStatus,
);
export type WhatsAppMessageStatusInfer = z.infer<
	typeof whatsappMessageStatusSchema
>;

/**
 * Team Member Role Enum
 */
export { TeamMemberRole };
export const teamMemberRoleSchema = z.nativeEnum(TeamMemberRole);
export const teamMemberRoleEnum = teamMemberRoleSchema.enum;
export const LIST_TEAM_MEMBER_ROLES = Object.values(TeamMemberRole);
export type TeamMemberRoleInfer = z.infer<typeof teamMemberRoleSchema>;

/**
 * Store Plan Type Enum
 */
export { StorePlanType };
export const storePlanTypeSchema = z.nativeEnum(StorePlanType);
export const storePlanTypeEnum = storePlanTypeSchema.enum;
export const LIST_STORE_PLAN_TYPES = Object.values(StorePlanType);
export type StorePlanTypeInfer = z.infer<typeof storePlanTypeSchema>;

/**
 * Store Category Enum
 */
export { StoreCategory };
export const storeCategorySchema = z.nativeEnum(StoreCategory);
export const storeCategoryEnum = storeCategorySchema.enum;
export const LIST_STORE_CATEGORIES = Object.values(StoreCategory);
export type StoreCategoryInfer = z.infer<typeof storeCategorySchema>;

/**
 * Store Theme Enum
 */
export { StoreTheme };
export const storeThemeSchema = z.nativeEnum(StoreTheme);
export const storeThemeEnum = storeThemeSchema.enum;
export const LIST_STORE_THEMES = Object.values(StoreTheme);
export type StoreThemeInfer = z.infer<typeof storeThemeSchema>;

/**
 * Health Status Enum
 */
export { HealthStatus };
export const healthStatusSchema = z.nativeEnum(HealthStatus);
export const healthStatusEnum = healthStatusSchema.enum;
export const LIST_HEALTH_STATUSES = Object.values(HealthStatus);
export type HealthStatusInfer = z.infer<typeof healthStatusSchema>;

/**
 * Storage File Variant Type Enum
 */
export { StorageFileVariantType };
export const storageFileVariantTypeSchema = z.nativeEnum(
	StorageFileVariantType,
);
export const storageFileVariantTypeEnum = storageFileVariantTypeSchema.enum;
export const LIST_STORAGE_FILE_VARIANT_TYPES = Object.values(
	StorageFileVariantType,
);
export type StorageFileVariantTypeInfer = z.infer<
	typeof storageFileVariantTypeSchema
>;

/**
 * Store Notification Method Enum
 */
export type { StoreNotificationMethod };
export const storeNotificationMethodSchema = z.nativeEnum(
	StoreNotificationMethod,
);
export const storeNotificationMethodEnum = storeNotificationMethodSchema.enum;
export const LIST_STORE_NOTIFICATION_METHODS = Object.values(
	StoreNotificationMethod,
);
export type StoreNotificationMethodInfer = z.infer<
	typeof storeNotificationMethodSchema
>;

/**
 * User Onboarding Step Enum
 */
export { UserOnboardingStep };
export const userOnboardingStepSchema = z.nativeEnum(UserOnboardingStep);
export const userOnboardingStepEnum = userOnboardingStepSchema.enum;
export const LIST_USER_ONBOARDING_STEPS = Object.values(UserOnboardingStep);
export type UserOnboardingStepInfer = z.infer<typeof userOnboardingStepSchema>;
