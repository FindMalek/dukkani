import { UserEntity } from "@dukkani/common/entities/user/entity";
import { UserQuery } from "@dukkani/common/entities/user/query";
import { checkEmailExistsInputSchema } from "@dukkani/common/schemas/user/input";
import { userSimpleOutputSchema } from "@dukkani/common/schemas/user/output";
import { database } from "@dukkani/db";
import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../index";
import { rateLimitSensitive } from "../middleware/rate-limit";

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
				throw new Error("User not found");
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
};
