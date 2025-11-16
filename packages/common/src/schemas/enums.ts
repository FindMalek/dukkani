import { z } from "zod";
import {
	OrderStatus,
	WhatsAppMessageStatus,
	TeamMemberRole,
	StorePlanType,
	StoreCategory,
	StoreTheme,
} from "@dukkani/db/prisma/generated";

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
export const LIST_WHATSAPP_MESSAGE_STATUSES = Object.values(WhatsAppMessageStatus);
export type WhatsAppMessageStatusInfer = z.infer<typeof whatsappMessageStatusSchema>;

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
