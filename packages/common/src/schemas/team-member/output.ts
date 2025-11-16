import { z } from "zod";
import { teamMemberRoleSchema } from "./enums";
import { userSimpleOutputSchema } from "../user/output";
import { storeSimpleOutputSchema } from "../store/output";

export const teamMemberSimpleOutputSchema = z.object({
	id: z.string(),
	userId: z.string(),
	storeId: z.string(),
	role: teamMemberRoleSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const teamMemberIncludeOutputSchema =
	teamMemberSimpleOutputSchema.extend({
		user: userSimpleOutputSchema.optional(),
		store: storeSimpleOutputSchema.optional(),
	});

export type TeamMemberSimpleOutput = z.infer<
	typeof teamMemberSimpleOutputSchema
>;
export type TeamMemberIncludeOutput = z.infer<
	typeof teamMemberIncludeOutputSchema
>;
