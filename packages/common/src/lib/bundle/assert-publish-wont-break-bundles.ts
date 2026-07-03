import type { Prisma } from "@dukkani/db/prisma/generated";
import { ProductVersionStatus } from "@dukkani/db/prisma/generated/enums";
import { BadRequestError } from "../../errors";

/**
 * Checks that publishing `draftVersionId` for `productId` won't break any existing bundles.
 * Called inside `ProductVersionService.publishDraft` before any status writes.
 * Blocks if:
 *  a) Draft removes a variant used as childVariantId in a PUBLISHED bundle
 *  b) Draft transitions hasVariants false→true while product is a simple child of a bundle
 *
 * Lives in `lib/` (not a service) so both `BundleService` and
 * `ProductVersionService` can call it without a circular import between them.
 */
export async function assertPublishWontBreakBundles(
  tx: Prisma.TransactionClient,
  productId: string,
  draftVersionId: string,
  previousPublishedId: string | null,
): Promise<void> {
  const bundleRefs = await tx.bundleItem.findMany({
    where: {
      childProductId: productId,
      bundleVersion: { status: ProductVersionStatus.PUBLISHED },
    },
    select: {
      childVariantId: true,
      bundleVersion: {
        select: {
          product: {
            select: {
              currentPublishedVersion: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  if (bundleRefs.length === 0) return;

  // Sequential, not Promise.all: an interactive transaction shares a single
  // connection, so concurrent queries against the same `tx` can race.
  const draftVariantRows = await tx.productVariant.findMany({
    where: { productVersionId: draftVersionId },
    select: { id: true },
  });
  const draftVersionRow = await tx.productVersion.findUnique({
    where: { id: draftVersionId },
    select: { hasVariants: true },
  });
  const oldVersionRow = previousPublishedId
    ? await tx.productVersion.findUnique({
        where: { id: previousPublishedId },
        select: { hasVariants: true },
      })
    : null;

  const draftVariantIds = new Set(draftVariantRows.map((v) => v.id));
  const oldHasVariants = oldVersionRow?.hasVariants ?? false;
  const newHasVariants = draftVersionRow?.hasVariants ?? false;

  const blockingNames: string[] = [];

  for (const ref of bundleRefs) {
    const name =
      ref.bundleVersion.product.currentPublishedVersion?.name ??
      "Unknown bundle";

    if (ref.childVariantId !== null) {
      if (!draftVariantIds.has(ref.childVariantId)) {
        blockingNames.push(name);
      }
    } else if (!oldHasVariants && newHasVariants) {
      blockingNames.push(name);
    }
  }

  if (blockingNames.length > 0) {
    const unique = [...new Set(blockingNames)];
    throw new BadRequestError(
      `Cannot publish: this product is used in ${unique.length === 1 ? "a bundle" : "bundles"}: ${unique.join(", ")}. Update those bundles first.`,
    );
  }
}
