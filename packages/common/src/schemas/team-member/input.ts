import { z } from "zod";
import { teamMemberRoleSchema } from "./enums";

export const teamMemberInputSchema = z.object({
	userId: z.string().min(1, "User ID is required"),
	storeId: z.string().min(1, "Store ID is required"),
	role: teamMemberRoleSchema,
});

export const createTeamMemberInputSchema = teamMemberInputSchema;

export const updateTeamMemberInputSchema = teamMemberInputSchema
	.partial()
	.extend({
		id: z.string().min(1, "Team Member ID is required"),
	});

export const getTeamMemberInputSchema = z.object({
	id: z.string().min(1, "Team Member ID is required"),
});

export const listTeamMembersInputSchema = z.object({
	storeId: z.string().optional(),
	userId: z.string().optional(),
	role: teamMemberRoleSchema.optional(),
});

export type TeamMemberInput = z.infer<typeof teamMemberInputSchema>;
export type CreateTeamMemberInput = z.infer<typeof createTeamMemberInputSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberInputSchema>;
export type GetTeamMemberInput = z.infer<typeof getTeamMemberInputSchema>;
export type ListTeamMembersInput = z.infer<typeof listTeamMembersInputSchema>;
