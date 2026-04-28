import type { Prisma } from "@dukkani/db/prisma/generated";
import { ProductType, ProductVersionStatus } from "@dukkani/db/prisma/generated/enums";
import { BundleItemQuery } from "../entities/bundle-item/query";
import { BadRequestError, NotFoundError } from "../errors";
import { computeBundleEffectiveStock } from "../lib/bundle/compute-bundle-stock";
import { generateProductId } from "../lib/id/generate-id";
import type { BundleItemInput } from "../schemas/bundle-item/input";
import type { CreateBundleInput, UpdateBundleInput } from "../schemas/bundle/input";
import { ProductVersionService } from "./product-version.service";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";

class BundleServiceBase {
  /**
   * Service-layer uniqueness + validation for bundle items.
   * Enforces:
   *  - ≥ 2 items
   *  - No null-variant duplicates (Postgres NULL != NULL in unique indexes)
   *  - No variant duplicates
   *  - Each child must be SIMPLE, published, and in the same store
   *  - childVariantId must exist on child's currentPublishedVersion
   *  - Child having variants requires a childVariantId to be specified
   */
  static async validateBundleItems(
    tx: Prisma.TransactionClient,
    storeId: string,
    items: BundleItemInput[],
  ): Promise<void> {
    if (items.length < 2) {
      throw new BadRequestError("Bundle requires at least 2 child products");
    }

    // Null-variant uniqueness: same product without variant can only appear once
    const simpleRefs = items.filter((i) => !i.childVariantId).map((i) => i.childProductId);
    if (new Set(simpleRefs).size < simpleRefs.length) {
      throw new BadRequestError(
        "Cannot add the same product (without a variant) more than once to a bundle",
      );
    }

    // Variant uniqueness: same product+variant can only appear once
    const variantKeys = items
      .filter((i) => i.childVariantId)
      .map((i) => `${i.childProductId}:${i.childVariantId}`);
    if (new Set(variantKeys).size < variantKeys.length) {
      throw new BadRequestError(
        "Cannot add the same product variant more than once to a bundle",
      );
    }

    const childProductIds = [...new Set(items.map((i) => i.childProductId))];
    const childProducts = await tx.product.findMany({
      where: {
        id: { in: childProductIds },
        storeId,
        published: true,
        currentPublishedVersionId: { not: null },
      },
      select: {
        id: true,
        type: true,
        currentPublishedVersion: {
          select: {
            id: true,
            hasVariants: true,
            variants: { select: { id: true } },
          },
        },
      },
    });

    if (childProducts.length !== childProductIds.length) {
      throw new BadRequestError(
        "One or more bundle child products were not found, are not published, or do not belong to this store",
      );
    }

    const productMap = new Map(childProducts.map((p) => [p.id, p]));

    for (const item of items) {
      const child = productMap.get(item.childProductId);
      if (!child) {
        throw new BadRequestError(
          `Child product ${item.childProductId} not found`,
        );
      }

      if (child.type === ProductType.BUNDLE) {
        throw new BadRequestError(
          "Cannot add a bundle as a child of another bundle",
        );
      }

      const pub = child.currentPublishedVersion;

      if (item.childVariantId) {
        const variantExists = pub?.variants.some(
          (v) => v.id === item.childVariantId,
        );
        if (!variantExists) {
          throw new BadRequestError(
            `Variant ${item.childVariantId} does not exist on child product ${item.childProductId}'s published version`,
          );
        }
      } else {
        if (pub?.hasVariants && pub.variants.length > 0) {
          throw new BadRequestError(
            `Child product ${item.childProductId} has variants — please select a specific variant`,
          );
        }
      }
    }
  }

  /**
   * Replace all bundle items for a version (delete-then-insert pattern, like writeAddonGroups).
   * Duplicate checking is done in validateBundleItems before calling this.
   */
  static async writeBundleItems(
    tx: Prisma.TransactionClient,
    bundleVersionId: string,
    items: BundleItemInput[],
  ): Promise<void> {
    await tx.bundleItem.deleteMany({ where: { bundleVersionId } });

    for (const item of items) {
      await tx.bundleItem.create({
        data: {
          bundleVersionId,
          childProductId: item.childProductId,
          childVariantId: item.childVariantId ?? null,
          itemQty: item.itemQty,
          sortOrder: item.sortOrder ?? 0,
        },
      });
    }
  }

  /**
   * Recompute and persist effective stock for a bundle's ProductVersion.
   * Sets both `stock` and `totalVariantStock` to the computed effective stock
   * so list filters and storefront OOS logic work correctly without extra queries.
   */
  static async recomputeBundleEffectiveStock(
    tx: Prisma.TransactionClient,
    bundleVersionId: string,
  ): Promise<void> {
    const bundleItems = await tx.bundleItem.findMany({
      where: { bundleVersionId },
      select: BundleItemQuery.getStockCheckSelect(),
    });

    const slots = bundleItems.map((bi) => {
      if (bi.childVariantId && bi.childVariant) {
        return {
          stock: bi.childVariant.stock,
          trackStock: bi.childVariant.trackStock,
          itemQty: bi.itemQty,
        };
      }
      const pub = bi.childProduct.currentPublishedVersion;
      if (!pub) {
        return { stock: 0, trackStock: true, itemQty: bi.itemQty };
      }
      return {
        stock: pub.stock,
        trackStock: true,
        itemQty: bi.itemQty,
      };
    });

    const effective = computeBundleEffectiveStock(slots);

    await tx.productVersion.update({
      where: { id: bundleVersionId },
      data: { stock: effective, totalVariantStock: effective },
    });
  }

  /**
   * After a child product's or variant's stock changes, find all PUBLISHED bundle versions
   * that reference any of the affected products/variants and recompute their effective stock.
   */
  static async recomputeBundlesReferencingProducts(
    tx: Prisma.TransactionClient,
    affectedProductIds: string[],
    affectedVariantIds: string[],
  ): Promise<void> {
    if (affectedProductIds.length === 0 && affectedVariantIds.length === 0) {
      return;
    }

    const conditions = [];
    if (affectedProductIds.length > 0) {
      conditions.push({ childProductId: { in: affectedProductIds } });
    }
    if (affectedVariantIds.length > 0) {
      conditions.push({ childVariantId: { in: affectedVariantIds } });
    }

    const affected = await tx.bundleItem.findMany({
      where: {
        OR: conditions,
        bundleVersion: { status: ProductVersionStatus.PUBLISHED },
      },
      select: { bundleVersionId: true },
      distinct: ["bundleVersionId"],
    });

    await Promise.all(
      affected.map(({ bundleVersionId }) =>
        BundleServiceBase.recomputeBundleEffectiveStock(tx, bundleVersionId),
      ),
    );
  }

  /**
   * Checks whether publishing a new draft for `productId` would break any bundle
   * that references this product's variants.
   *
   * Blocks publish if:
   *  a) The draft removes a variant that is used as childVariantId in a PUBLISHED bundle
   *  b) The draft transitions hasVariants false→true while the product is in a bundle
   *     as a simple (no-variant) child (childVariantId = null)
   *
   * Called inside ProductVersionService.publishDraft before any status writes.
   */
  static async assertPublishWontBreakBundles(
    tx: Prisma.TransactionClient,
    productId: string,
    draftVersionId: string,
    previousPublishedVersionId: string | null,
  ): Promise<void> {
    // Load draft hasVariants
    const draftVersion = await tx.productVersion.findUnique({
      where: { id: draftVersionId },
      select: { hasVariants: true, isBundle: true },
    });

    // Bundles can't be children of bundles — only check SIMPLE products
    if (!draftVersion || draftVersion.isBundle) return;

    // Load bundles referencing this product
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

    // Get variant IDs in the draft
    const draftVariantIds = new Set(
      (
        await tx.productVariant.findMany({
          where: { productVersionId: draftVersionId },
          select: { id: true },
        })
      ).map((v) => v.id),
    );

    // Get old published hasVariants (if exists)
    const oldHasVariants = previousPublishedVersionId
      ? (
          await tx.productVersion.findUnique({
            where: { id: previousPublishedVersionId },
            select: { hasVariants: true },
          })
        )?.hasVariants ?? false
      : false;

    const blockingNames: string[] = [];

    for (const ref of bundleRefs) {
      const bundleName =
        ref.bundleVersion.product.currentPublishedVersion?.name ?? "Unknown bundle";

      if (ref.childVariantId !== null) {
        // Case a: variant-specific reference that disappears in the draft
        if (!draftVariantIds.has(ref.childVariantId)) {
          blockingNames.push(bundleName);
        }
      } else {
        // Case b: null-variant ref + product transitions from simple → variant
        if (!oldHasVariants && draftVersion.hasVariants) {
          blockingNames.push(bundleName);
        }
      }
    }

    if (blockingNames.length > 0) {
      const unique = [...new Set(blockingNames)];
      throw new BadRequestError(
        `Cannot publish: this product is used in ${unique.length === 1 ? "a bundle" : "bundles"}: ${unique.join(", ")}. Update those bundles first.`,
      );
    }
  }

  /**
   * Create a new bundle product with an initial published version.
   */
  static async createBundle(
    tx: Prisma.TransactionClient,
    storeSlug: string,
    storeId: string,
    input: CreateBundleInput,
  ): Promise<string> {
    addSpanAttributes({
      "bundle.store_id": storeId,
      "bundle.items_count": input.bundleItems.length,
    });

    await BundleServiceBase.validateBundleItems(tx, storeId, input.bundleItems);

    const productId = generateProductId(storeSlug);

    await tx.product.create({
      data: {
        id: productId,
        published: input.published ?? false,
        type: ProductType.BUNDLE,
        storeId,
        categoryId: input.categoryId ?? null,
      },
    });

    const version = await tx.productVersion.create({
      data: {
        productId,
        status: ProductVersionStatus.PUBLISHED,
        versionNumber: 1,
        name: input.name,
        description: input.description ?? null,
        price: input.price,
        stock: 0,
        totalVariantStock: 0,
        hasVariants: false,
        isBundle: true,
        images: input.imageUrls?.length
          ? { create: input.imageUrls.map((url) => ({ url })) }
          : undefined,
      },
    });

    await BundleServiceBase.writeBundleItems(tx, version.id, input.bundleItems);
    await BundleServiceBase.recomputeBundleEffectiveStock(tx, version.id);

    await tx.product.update({
      where: { id: productId },
      data: { currentPublishedVersionId: version.id },
    });

    addSpanAttributes({ "bundle.product_id": productId });

    return productId;
  }

  /**
   * Update an existing bundle — edits go to the draft version (forked from published if none exists).
   */
  static async updateBundle(
    tx: Prisma.TransactionClient,
    bundleProductId: string,
    input: UpdateBundleInput,
  ): Promise<void> {
    addSpanAttributes({ "bundle.product_id": bundleProductId });

    const product = await tx.product.findUnique({
      where: { id: bundleProductId },
      select: { type: true, storeId: true },
    });

    if (!product || product.type !== ProductType.BUNDLE) {
      throw new NotFoundError("Bundle not found");
    }

    const versionId = await ProductVersionService.ensureEditingVersionId(
      tx,
      bundleProductId,
    );

    if (input.bundleItems !== undefined) {
      await BundleServiceBase.validateBundleItems(
        tx,
        product.storeId,
        input.bundleItems,
      );
      await BundleServiceBase.writeBundleItems(tx, versionId, input.bundleItems);
    }

    await tx.productVersion.update({
      where: { id: versionId },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && {
          description: input.description || null,
        }),
        ...(input.price !== undefined && { price: input.price }),
      },
    });

    if (input.imageUrls !== undefined) {
      await tx.image.deleteMany({ where: { productVersionId: versionId } });
      if (input.imageUrls.length > 0) {
        await tx.image.createMany({
          data: input.imageUrls.map((url) => ({ url, productVersionId: versionId })),
        });
      }
    }

    await tx.product.update({
      where: { id: bundleProductId },
      data: {
        ...(input.published !== undefined && { published: input.published }),
        ...(input.categoryId !== undefined && {
          categoryId: input.categoryId || null,
        }),
      },
    });

    await BundleServiceBase.recomputeBundleEffectiveStock(tx, versionId);
  }
}

export const BundleService = traceStaticClass(BundleServiceBase);
