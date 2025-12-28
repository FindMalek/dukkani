import { z } from "zod";
import { userOnboardingStepSchema } from "../enums";

/**
 * User output schemas (Return Objects)
 */

export const userSimpleOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean(),
	image: z.string().nullable(),
	onboardingStep: userOnboardingStepSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const listUsersOutputSchema = z.object({
	users: z.array(userSimpleOutputSchema),
	total: z.number().int(),
	hasMore: z.boolean(),
	page: z.number().int(),
	limit: z.number().int(),
});

export type UserSimpleOutput = z.infer<typeof userSimpleOutputSchema>;
export type ListUsersOutput = z.infer<typeof listUsersOutputSchema>;
