import { z } from "zod";
import { TeamMemberRole } from "@dukkani/db/prisma/generated";

export const teamMemberRoleSchema = z.nativeEnum(TeamMemberRole);
export const teamMemberRoleEnum = teamMemberRoleSchema.enum;
export const LIST_TEAM_MEMBER_ROLES = Object.values(teamMemberRoleEnum);

export type TeamMemberRoleInfer = z.infer<typeof teamMemberRoleSchema>;

