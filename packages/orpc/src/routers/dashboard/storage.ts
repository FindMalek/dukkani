import {
  deleteFileInputSchema,
  deleteFilesInputSchema,
} from "@dukkani/common/schemas/storage/input";
import type { DeleteManyOutput } from "@dukkani/common/schemas/storage/output";
import { deleteManyOutputSchema } from "@dukkani/common/schemas/storage/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { StorageService as StorageDbService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { env, StorageService } from "@dukkani/storage";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../../procedures";

export const storageRouter = {
  delete: protectedProcedure
    .input(deleteFileInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input }) => {
      try {
        const file = await database.storageFile.findUnique({
          where: { id: input.id },
          select: {
            id: true,
            bucket: true,
            path: true,
            variants: { select: { url: true } },
          },
        });

        if (!file) {
          throw new ORPCError("NOT_FOUND", { message: "File not found" });
        }

        const paths = new Set<string>([file.path]);
        for (const variant of file.variants) {
          const key = await StorageService.getKeyFromPublicUrl(
            variant.url,
            env.S3_PUBLIC_BASE_URL,
          );
          if (key) {
            paths.add(key);
          } else {
            logger.warn({ url: variant.url }, "Failed to parse variant URL");
          }
        }

        await database.$transaction(async (tx) => {
          await StorageDbService.deleteStorageFile(file.id, tx);
        });

        const allPaths = [...paths];
        if (allPaths.length > 0) {
          try {
            await StorageService.deleteFiles(file.bucket, allPaths);
          } catch (error) {
            logger.error(
              { bucket: file.bucket, paths: allPaths, error },
              "Failed to delete storage files, attempting individual cleanup",
            );
            for (const path of allPaths) {
              try {
                await StorageService.deleteFile(file.bucket, path);
              } catch (individualError) {
                logger.error(
                  { bucket: file.bucket, path, error: individualError },
                  "Failed to delete individual storage file - orphaned object created",
                );
              }
            }
          }
        }

        return { success: true };
      } catch (error) {
        if (error instanceof ORPCError) throw error;
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message:
            error instanceof Error ? error.message : "Failed to delete file",
        });
      }
    }),

  deleteMany: protectedProcedure
    .input(deleteFilesInputSchema)
    .output(deleteManyOutputSchema)
    .handler(async ({ input }): Promise<DeleteManyOutput> => {
      try {
        const files = await database.storageFile.findMany({
          where: { id: { in: input.ids } },
          select: {
            id: true,
            bucket: true,
            path: true,
            variants: { select: { url: true } },
          },
        });

        if (files.length === 0) {
          return { success: true, deleted: 0 };
        }

        const filesByBucket = new Map<
          string,
          Array<{ paths: string[]; fileId: string }>
        >();
        for (const file of files) {
          const paths = new Set<string>([file.path]);
          for (const variant of file.variants) {
            const key = await StorageService.getKeyFromPublicUrl(
              variant.url,
              env.S3_PUBLIC_BASE_URL,
            );
            if (key) {
              paths.add(key);
            } else {
              logger.warn({ url: variant.url }, "Failed to parse variant URL");
            }
          }
          const bucketFiles = filesByBucket.get(file.bucket) ?? [];
          bucketFiles.push({ paths: [...paths], fileId: file.id });
          filesByBucket.set(file.bucket, bucketFiles);
        }

        await database.$transaction(async (tx) => {
          await Promise.all(
            files.map((file) =>
              StorageDbService.deleteStorageFile(file.id, tx),
            ),
          );
        });

        const storageErrors: Array<{
          bucket: string;
          paths: string[];
          error: unknown;
        }> = [];
        const failedPaths: Array<{ bucket: string; path: string }> = [];

        for (const [bucket, bucketFiles] of filesByBucket.entries()) {
          const allPaths = bucketFiles.flatMap((f) => f.paths);
          if (allPaths.length > 0) {
            try {
              await StorageService.deleteFiles(bucket, allPaths);
            } catch (error) {
              storageErrors.push({ bucket, paths: allPaths, error });
              logger.error(
                { bucket, paths: allPaths, error },
                "Failed to delete storage files, attempting individual cleanup",
              );
              for (const path of allPaths) {
                try {
                  await StorageService.deleteFile(bucket, path);
                } catch (individualError) {
                  failedPaths.push({ bucket, path });
                  logger.error(
                    { bucket, path, error: individualError },
                    "Failed to delete individual storage file - orphaned object created",
                  );
                }
              }
            }
          }
        }

        if (failedPaths.length > 0) {
          logger.warn(
            { failedPaths: failedPaths.length, totalFiles: files.length },
            "Some storage files could not be deleted - manual cleanup may be required",
          );
        }

        return {
          success: true,
          deleted: files.length,
          ...(storageErrors.length > 0 && { warnings: storageErrors.length }),
        };
      } catch (error) {
        if (error instanceof ORPCError) throw error;
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message:
            error instanceof Error ? error.message : "Failed to delete files",
        });
      }
    }),
};
