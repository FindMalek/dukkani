import { UserQuery } from "@dukkani/common/entities/user/query";
import { checkEmailExistsInputSchema } from "@dukkani/common/schemas/user/input";
import { database } from "@dukkani/db";
import { z } from "zod";
import { publicProcedure } from "../index";
import { rateLimitSensitive } from "../middleware/rate-limit";

export const authRouter = {
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
