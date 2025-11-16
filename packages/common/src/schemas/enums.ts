import { z } from "zod";

/**
 * Order Status Enum
 */
export enum OrderStatus {
	PENDING = "PENDING",
	CONFIRMED = "CONFIRMED",
	PROCESSING = "PROCESSING",
	SHIPPED = "SHIPPED",
	DELIVERED = "DELIVERED",
	CANCELLED = "CANCELLED",
}

export const orderStatusSchema = z.nativeEnum(OrderStatus);
export const orderStatusEnum = orderStatusSchema.enum;
export const LIST_ORDER_STATUSES = Object.values(OrderStatus);
export type OrderStatusInfer = z.infer<typeof orderStatusSchema>;

/**
 * WhatsApp Message Status Enum
 */
export enum WhatsAppMessageStatus {
	PENDING = "PENDING",
	SENT = "SENT",
	DELIVERED = "DELIVERED",
	READ = "READ",
	FAILED = "FAILED",
}

export const whatsappMessageStatusSchema = z.nativeEnum(WhatsAppMessageStatus);
export const whatsappMessageStatusEnum = whatsappMessageStatusSchema.enum;
export const LIST_WHATSAPP_MESSAGE_STATUSES = Object.values(WhatsAppMessageStatus);
export type WhatsAppMessageStatusInfer = z.infer<typeof whatsappMessageStatusSchema>;

/**
 * Team Member Role Enum
 */
export enum TeamMemberRole {
	OWNER = "OWNER",
	ADMIN = "ADMIN",
	MANAGER = "MANAGER",
	STAFF = "STAFF",
}

export const teamMemberRoleSchema = z.nativeEnum(TeamMemberRole);
export const teamMemberRoleEnum = teamMemberRoleSchema.enum;
export const LIST_TEAM_MEMBER_ROLES = Object.values(TeamMemberRole);
export type TeamMemberRoleInfer = z.infer<typeof teamMemberRoleSchema>;

/**
 * Store Plan Type Enum
 */
export enum StorePlanType {
	FREE = "FREE",
	BASIC = "BASIC",
	PREMIUM = "PREMIUM",
	ENTERPRISE = "ENTERPRISE",
}

export const storePlanTypeSchema = z.nativeEnum(StorePlanType);
export const storePlanTypeEnum = storePlanTypeSchema.enum;
export const LIST_STORE_PLAN_TYPES = Object.values(StorePlanType);
export type StorePlanTypeInfer = z.infer<typeof storePlanTypeSchema>;

/**
 * Store Category Enum
 */
export enum StoreCategory {
	FASHION = "FASHION",
	ELECTRONICS = "ELECTRONICS",
	FOOD = "FOOD",
	HOME = "HOME",
	BEAUTY = "BEAUTY",
	SPORTS = "SPORTS",
	BOOKS = "BOOKS",
	TOYS = "TOYS",
	OTHER = "OTHER",
}

export const storeCategorySchema = z.nativeEnum(StoreCategory);
export const storeCategoryEnum = storeCategorySchema.enum;
export const LIST_STORE_CATEGORIES = Object.values(StoreCategory);
export type StoreCategoryInfer = z.infer<typeof storeCategorySchema>;

/**
 * Store Theme Enum
 */
export enum StoreTheme {
	LIGHT = "LIGHT",
	DARK = "DARK",
	MINIMAL = "MINIMAL",
	MODERN = "MODERN",
	CLASSIC = "CLASSIC",
}

export const storeThemeSchema = z.nativeEnum(StoreTheme);
export const storeThemeEnum = storeThemeSchema.enum;
export const LIST_STORE_THEMES = Object.values(StoreTheme);
export type StoreThemeInfer = z.infer<typeof storeThemeSchema>;

