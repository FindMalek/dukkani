import { CollectionEntity } from "@dukkani/common/entities/collection/entity";
import { CollectionQuery } from "@dukkani/common/entities/collection/query";
import { getCollectionInputSchema } from "@dukkani/common/schemas/collection/input";
import { collectionIncludeOutputSchema } from "@dukkani/common/schemas/collection/output";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure } from "../../procedures";

export const collectionRouter = {
  getById: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getCollectionInputSchema)
    .output(collectionIncludeOutputSchema)
    .handler(async ({ input }) => {
      const collection = await database.collection.findUnique({
        where: { id: input.id },
        include: CollectionQuery.getInclude(),
      });

      if (!collection) {
        throw new ORPCError("NOT_FOUND", { message: "Collection not found" });
      }

      return CollectionEntity.getRo(collection);
    }),
};
