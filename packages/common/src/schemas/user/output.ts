import { z } from "zod";

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

// Use lazy evaluation to handle circular references
export const userIncludeOutputSchema: z.ZodType<{
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	createdAt: Date;
	updatedAt: Date;
	stores?: unknown[];
	teamMembers?: unknown[];
}> = userSimpleOutputSchema.extend({
	stores: z.array(z.unknown()).optional(),
	teamMembers: z.array(z.unknown()).optional(),
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

