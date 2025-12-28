import { StorePlanType } from "@dukkani/db/prisma/generated/enums";

/**
 * Store Plan Order Limits
 * Defines the maximum number of orders allowed per plan type
 */
export const STORE_PLAN_ORDER_LIMITS: Record<StorePlanType, number> = {
	[StorePlanType.FREE]: 100,
	[StorePlanType.BASIC]: 500,
	[StorePlanType.PREMIUM]: 1000,
	[StorePlanType.ENTERPRISE]: 10000, // Unlimited for enterprise
} as const;

/**
 * Get order limit for a plan type
 */
export function getOrderLimitForPlan(planType: StorePlanType): number {
	return STORE_PLAN_ORDER_LIMITS[planType];
}
