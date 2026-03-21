import { UserEntity } from "@dukkani/common/entities/user/entity";
import { UserQuery } from "@dukkani/common/entities/user/query";
import { uploadFileOutputSchema } from "@dukkani/common/schemas/storage/output";
import {
	accountUploadAvatarInputSchema,
	checkEmailExistsInputSchema,
} from "@dukkani/common/schemas/user/input";
import { userSimpleOutputSchema } from "@dukkani/common/schemas/user/output";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { rateLimitSensitive } from "../middleware/rate-limit";
import { protectedProcedure, publicProcedure } from "../procedures";
import { executeUploadFile } from "../utils/storage-upload";

export const accountRouter = {
	/**
	 * Get current authenticated user with onboarding step
	 */
	getCurrentUser: protectedProcedure
		.output(userSimpleOutputSchema)
		.handler(async ({ context }) => {
			const userId = context.session.user.id;

			const user = await database.user.findUnique({
				where: { id: userId },
				include: UserQuery.getSimpleInclude(),
			});

			if (!user) {
				throw new ORPCError("NOT_FOUND", {
					message: "User not found",
				});
			}

			return UserEntity.getSimpleRo(user);
		}),

	/**
	 * Check if an email address is already registered
	 * Rate limited to prevent email enumeration attacks
	 */
	checkEmailExists: publicProcedure
		.use(rateLimitSensitive)
		.input(checkEmailExistsInputSchema)
		.output(z.boolean())
		.handler(async ({ input }) => {
			const user = await database.user.findUnique({
				where: { email: input.email },
				select: UserQuery.getMinimalSelect(),
			});

			return !!user;
		}),

	/**
	 * Upload user avatar
	 * Uses userId from session; no storeId needed
	 */
	uploadAvatar: protectedProcedure
		.input(accountUploadAvatarInputSchema)
		.output(uploadFileOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			const target = {
				resource: "avatars" as const,
				entityId: userId,
			};

			try {
				return await executeUploadFile(input.file, target);
			} catch (error) {
				throw new ORPCError("INTERNAL_SERVER_ERROR", {
					message:
						error instanceof Error ? error.message : "Failed to upload avatar",
				});
			}
		}),
};
