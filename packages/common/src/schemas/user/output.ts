import { z } from "zod";
import { storeSimpleOutputSchema } from "../store/output";
import { teamMemberSimpleOutputSchema } from "../team-member/output";

/**
 * User output schemas (Return Objects)
 */

export const userSimpleOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean(),
	image: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const userIncludeOutputSchema = userSimpleOutputSchema.extend({
	stores: z.array(storeSimpleOutputSchema).optional(),
	teamMembers: z.array(teamMemberSimpleOutputSchema).optional(),
});

export const listUsersOutputSchema = z.object({
	users: z.array(userSimpleOutputSchema),
	total: z.number().int(),
	hasMore: z.boolean(),
	page: z.number().int(),
	limit: z.number().int(),
});

export type UserSimpleOutput = z.infer<typeof userSimpleOutputSchema>;
export type UserIncludeOutput = z.infer<typeof userIncludeOutputSchema>;
export type ListUsersOutput = z.infer<typeof listUsersOutputSchema>;
