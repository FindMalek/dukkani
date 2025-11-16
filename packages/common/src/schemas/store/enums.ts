import { z } from "zod";
import {
	StoreCategory,
	StoreTheme,
	StorePlanType,
} from "@dukkani/db/prisma/generated";

export const storeCategorySchema = z.nativeEnum(StoreCategory);
export const storeCategoryEnum = storeCategorySchema.enum;
export const LIST_STORE_CATEGORIES = Object.values(storeCategoryEnum);

export const storeThemeSchema = z.nativeEnum(StoreTheme);
export const storeThemeEnum = storeThemeSchema.enum;
export const LIST_STORE_THEMES = Object.values(storeThemeEnum);

export const storePlanTypeSchema = z.nativeEnum(StorePlanType);
export const storePlanTypeEnum = storePlanTypeSchema.enum;
export const LIST_STORE_PLAN_TYPES = Object.values(storePlanTypeEnum);

export type StoreCategoryInfer = z.infer<typeof storeCategorySchema>;
export type StoreThemeInfer = z.infer<typeof storeThemeSchema>;
export type StorePlanTypeInfer = z.infer<typeof storePlanTypeSchema>;

