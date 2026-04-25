import { UserEntity } from "@dukkani/common/entities/user/entity";
import { UserQuery } from "@dukkani/common/entities/user/query";
import { userSimpleOutputSchema } from "@dukkani/common/schemas/user/output";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../../procedures";

export const accountRouter = {
  getCurrentUser: protectedProcedure
    .output(userSimpleOutputSchema)
    .handler(async ({ context }) => {
      const userId = context.session.user.id;

      const user = await database.user.findUnique({
        where: { id: userId },
        include: UserQuery.getSimpleInclude(),
      });

      if (!user) {
        throw new ORPCError("NOT_FOUND", { message: "User not found" });
      }

      return UserEntity.getSimpleRo(user);
    }),
};
