import {
  DeleteObjectsCommand,
  ListObjectsCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { logger } from "@dukkani/logger";

/**
 * Delete all objects whose keys start with the given prefix (folder-style).
 * Prefix may be `foo` or `foo/`; a trailing slash is ensured for listing.
 */
export async function deleteFolderByPrefixWithClient(
  client: S3Client,
  bucket: string,
  prefix: string,
): Promise<{ totalDeleted: number }> {
  const folderPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;

  let marker: string | undefined;
  let totalDeleted = 0;
  let isTruncated = true;

  try {
    do {
      const listResponse = await client.send(
        new ListObjectsCommand({
          Bucket: bucket,
          Prefix: folderPrefix,
          Marker: marker,
        }),
      );

      const objects =
        listResponse.Contents?.map((obj) => ({ Key: obj.Key || "" })).filter(
          (obj) => obj.Key,
        ) || [];

      if (objects.length > 0) {
        const deleteResponse = await client.send(
          new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: {
              Objects: objects,
              Quiet: true,
            },
          }),
        );
        const deleteErrors = deleteResponse.Errors ?? [];
        if (deleteErrors.length > 0) {
          logger.warn(
            {
              bucket,
              prefix: folderPrefix,
              failedKeys: deleteErrors.map((e) => ({
                key: e.Key,
                code: e.Code,
                message: e.Message,
              })),
            },
            "Some objects failed to delete in batch",
          );
        }
        totalDeleted += objects.length - deleteErrors.length;
      }

      isTruncated = listResponse.IsTruncated || false;
      marker = listResponse.NextMarker || listResponse.Contents?.at(-1)?.Key;
    } while (isTruncated);

    if (totalDeleted > 0) {
      logger.info(
        { bucket, prefix: folderPrefix, totalDeleted },
        "Successfully deleted folder contents",
      );
    }

    return { totalDeleted };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(
      {
        bucket,
        prefix: folderPrefix,
        error: errorMessage,
      },
      "Failed to delete storage folder",
    );
    throw new Error(`Failed to delete folder ${folderPrefix}: ${errorMessage}`);
  }
}
