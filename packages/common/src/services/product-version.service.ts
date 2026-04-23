import type { Prisma } from "@dukkani/db/prisma/generated";
import { ProductVersionStatus } from "@dukkani/db/prisma/generated/enums";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import { ProductVersionQuery } from "../entities/product-version/query";
import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import { variantPriceRangeMinMax } from "../lib/pricing/variant-effective-price";
import type { CreateInitialPublishedVersionInput } from "../schemas/product/input";
import type { ProductAddonGroupInput } from "../schemas/product-addon/input";
import type {
  VariantInput,
  VariantOptionInput,
} from "../schemas/variant/input";

class ProductVersionServiceBase {
  /**
   * Refresh denormalized min/max effective variant prices on {@link ProductVersion}.
   */
  static async recomputeVariantEffectivePriceBounds(
    tx: Prisma.TransactionClient,
    productVersionId: string,
  ): Promise<void> {
    const row = await tx.productVersion.findUnique({
      where: { id: productVersionId },
      select: {
        price: true,
        variants: { select: { price: true } },
      },
    });

    if (!row) {
      return;
    }

    const range = variantPriceRangeMinMax(row.variants, row.price);
    await tx.productVersion.update({
      where: { id: productVersionId },
      data:
        range === null
          ? {
              variantEffectivePriceMin: null,
              variantEffectivePriceMax: null,
            }
          : {
              variantEffectivePriceMin: range.min,
              variantEffectivePriceMax: range.max,
            },
    });
  }

  /**
   * Denormalize {@link ProductVersion}.totalVariantStock for list filters/sorts:
   * when hasVariants, sum of variant `stock`; otherwise mirrors `stock`.
   */
  static async recomputeTotalVariantStock(
    tx: Prisma.TransactionClient,
    productVersionId: string,
  ): Promise<void> {
    const v = await tx.productVersion.findUnique({
      where: { id: productVersionId },
      select: { hasVariants: true, stock: true },
    });

    if (!v) {
      return;
    }

    if (v.hasVariants) {
      const agg = await tx.productVariant.aggregate({
        where: { productVersionId },
        _sum: { stock: true },
      });
      const total = agg._sum.stock ?? 0;
      await tx.productVersion.update({
        where: { id: productVersionId },
        data: { totalVariantStock: total },
      });
    } else {
      await tx.productVersion.update({
        where: { id: productVersionId },
        data: { totalVariantStock: v.stock },
      });
    }
  }

  /**
   * Next monotonic version number for a product (1-based).
   */
  static async nextVersionNumber(
    tx: Prisma.TransactionClient,
    productId: string,
  ): Promise<number> {
    const agg = await tx.productVersion.aggregate({
      where: { productId },
      _max: { versionNumber: true },
    });
    return (agg._max.versionNumber ?? 0) + 1;
  }

  /**
   * Deep-clone the current published snapshot into a new DRAFT and point Product.draftVersionId at it.
   */
  static async clonePublishedToDraft(
    tx: Prisma.TransactionClient,
    productId: string,
  ): Promise<string> {
    const product = await tx.product.findUnique({
      where: { id: productId },
      include: {
        currentPublishedVersion: {
          include: ProductVersionQuery.getCloneTreeInclude(),
        },
      },
    });

    if (!product?.currentPublishedVersion) {
      throw new BadRequestError(
        "Cannot edit: product has no published version to fork from",
      );
    }

    const src = product.currentPublishedVersion;
    const versionNumber = await ProductVersionService.nextVersionNumber(
      tx,
      productId,
    );

    const draft = await tx.productVersion.create({
      data: {
        productId,
        status: ProductVersionStatus.DRAFT,
        versionNumber,
        name: src.name,
        description: src.description,
        price: src.price,
        stock: src.stock,
        totalVariantStock: src.hasVariants ? 0 : src.stock,
        hasVariants: src.hasVariants,
        createdFromVersionId: src.id,
        images: {
          create: src.images.map((img) => ({ url: img.url })),
        },
        variantOptions: {
          create: src.variantOptions.map((opt) => ({
            name: opt.name,
            values: {
              create: opt.values.map((v) => ({ value: v.value })),
            },
          })),
        },
        addonGroups: {
          create: src.addonGroups.map((g) => ({
            name: g.name,
            sortOrder: g.sortOrder,
            selectionType: g.selectionType,
            required: g.required,
            options: {
              create: g.options.map((o) => ({
                name: o.name,
                sortOrder: o.sortOrder,
                priceDelta: o.priceDelta,
                stock: o.stock,
              })),
            },
          })),
        },
      },
      include: {
        images: { select: { id: true, url: true } },
        variantOptions: { include: { values: true } },
      },
    });

    // Build old image URL → new draft image ID map for variant imageId remapping
    const oldUrlToNewImageId = new Map<string, string>(
      draft.images.map((img) => [img.url, img.id]),
    );

    const oldValueIdToNew = new Map<string, string>();
    const oldOptionIdToNew = new Map<string, string>();

    for (const oldOpt of src.variantOptions) {
      const newOpt = draft.variantOptions.find((o) => o.name === oldOpt.name);
      if (!newOpt) continue;
      oldOptionIdToNew.set(oldOpt.id, newOpt.id);
      for (const oldVal of oldOpt.values) {
        const newVal = newOpt.values.find((v) => v.value === oldVal.value);
        if (newVal) {
          oldValueIdToNew.set(oldVal.id, newVal.id);
        }
      }
    }

    for (const v of src.variants) {
      const newImageId = (() => {
        if (!v.image?.url) return null;
        return oldUrlToNewImageId.get(v.image.url) ?? null;
      })();

      await tx.productVariant.create({
        data: {
          productVersionId: draft.id,
          sku: v.sku,
          price: v.price,
          stock: v.stock,
          trackStock: v.trackStock,
          imageId: newImageId,
          selections: {
            create: v.selections
              .map((s) => {
                const optionId = oldOptionIdToNew.get(s.optionId);
                const valueId = oldValueIdToNew.get(s.valueId);
                if (!optionId || !valueId) return null;
                return { optionId, valueId };
              })
              .filter(
                (x): x is { optionId: string; valueId: string } => x !== null,
              ),
          },
        },
      });
    }

    await ProductVersionServiceBase.recomputeVariantEffectivePriceBounds(
      tx,
      draft.id,
    );
    await ProductVersionServiceBase.recomputeTotalVariantStock(tx, draft.id);

    await tx.product.update({
      where: { id: productId },
      data: { draftVersionId: draft.id },
    });

    addSpanAttributes({
      "product_version.draft_created": true,
      "product_version.from_version": src.id,
    });

    return draft.id;
  }

  /**
   * Returns the id of the version merchants should mutate (existing draft or a new clone).
   */
  static async ensureEditingVersionId(
    tx: Prisma.TransactionClient,
    productId: string,
  ): Promise<string> {
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { draftVersionId: true },
    });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    if (product.draftVersionId) {
      return product.draftVersionId;
    }

    return ProductVersionService.clonePublishedToDraft(tx, productId);
  }

  /**
   * Replace add-on groups + options for a version (draft or initial publish).
   */
  static async writeAddonGroups(
    tx: Prisma.TransactionClient,
    productVersionId: string,
    groups: ProductAddonGroupInput[],
  ): Promise<void> {
    await tx.productAddonGroup.deleteMany({ where: { productVersionId } });

    for (const g of groups) {
      await tx.productAddonGroup.create({
        data: {
          productVersionId,
          name: g.name,
          sortOrder: g.sortOrder ?? 0,
          selectionType: g.selectionType,
          required: g.required ?? false,
          options: {
            create: g.options.map((o) => ({
              name: o.name,
              sortOrder: o.sortOrder ?? 0,
              priceDelta: o.priceDelta,
              stock: o.stock ?? 0,
            })),
          },
        },
      });
    }
  }

  /**
   * Replace options + variants for a version (used after deletes for draft updates).
   * @param imageUrlToId Optional map of image URL → Image.id for resolving variant imageId FKs.
   */
  static async writeVariantMatrix(
    tx: Prisma.TransactionClient,
    productVersionId: string,
    variantOptions: VariantOptionInput[],
    variants: VariantInput[],
    imageUrlToId?: Map<string, string>,
  ): Promise<void> {
    const optionMap = new Map<
      string,
      { optionId: string; values: Map<string, string> }
    >();

    for (const option of variantOptions) {
      const createdOption = await tx.productVariantOption.create({
        data: {
          name: option.name,
          productVersionId,
          values: {
            create: option.values.map((v) => ({
              value: v.value,
            })),
          },
        },
        include: {
          values: true,
        },
      });

      const valueMap = new Map<string, string>();
      for (const value of createdOption.values) {
        valueMap.set(value.value, value.id);
      }

      optionMap.set(option.name, {
        optionId: createdOption.id,
        values: valueMap,
      });
    }

    const skusInBatch = new Set<string>();
    for (const variant of variants) {
      if (variant.sku?.trim()) {
        const normalizedSku = variant.sku.trim();
        if (skusInBatch.has(normalizedSku)) {
          throw new BadRequestError(
            `Duplicate SKU "${normalizedSku}" found in variants`,
          );
        }
        skusInBatch.add(normalizedSku);
      }
    }

    const existingVariants = await tx.productVariant.findMany({
      where: {
        productVersionId,
        sku: { in: Array.from(skusInBatch) },
      },
      select: { sku: true },
    });

    if (existingVariants.length > 0) {
      const existingSkus = existingVariants.map((v) => v.sku).join(", ");
      throw new BadRequestError(
        `SKU(s) already exist for this version: ${existingSkus}`,
      );
    }

    for (const variant of variants) {
      const variantSelections: Array<{ optionId: string; valueId: string }> =
        [];

      for (const [optionName, valueString] of Object.entries(
        variant.selections,
      )) {
        const optionData = optionMap.get(optionName);

        if (!optionData) {
          throw new BadRequestError(`Option "${optionName}" not found`);
        }

        const valueId = optionData.values.get(valueString);
        if (!valueId) {
          throw new BadRequestError(
            `Value "${valueString}" not found for option "${optionName}"`,
          );
        }

        variantSelections.push({
          optionId: optionData.optionId,
          valueId,
        });
      }

      await tx.productVariant.create({
        data: {
          sku: variant.sku,
          price: variant.price ?? null,
          stock: variant.stock,
          trackStock: variant.trackStock ?? true,
          imageId:
            variant.imageUrl && imageUrlToId
              ? (imageUrlToId.get(variant.imageUrl) ?? null)
              : null,
          productVersionId,
          selections: {
            create: variantSelections.map((s) => ({
              optionId: s.optionId,
              valueId: s.valueId,
            })),
          },
        },
      });
    }

    await ProductVersionServiceBase.recomputeVariantEffectivePriceBounds(
      tx,
      productVersionId,
    );
    await ProductVersionServiceBase.recomputeTotalVariantStock(
      tx,
      productVersionId,
    );
  }

  /**
   * Clears variant matrix on a version (options, values, variants, selections via cascade).
   */
  static async clearVariantMatrix(
    tx: Prisma.TransactionClient,
    productVersionId: string,
  ): Promise<void> {
    await tx.productVariant.deleteMany({ where: { productVersionId } });
    await tx.productVariantOption.deleteMany({ where: { productVersionId } });
    await ProductVersionServiceBase.recomputeVariantEffectivePriceBounds(
      tx,
      productVersionId,
    );
    await ProductVersionServiceBase.recomputeTotalVariantStock(
      tx,
      productVersionId,
    );
  }

  /**
   * Publish draft: archive previous published, promote draft, clear draft pointer.
   */
  static async publishDraft(
    tx: Prisma.TransactionClient,
    productId: string,
    expectedDraftUpdatedAt?: Date,
  ): Promise<void> {
    const product = await tx.product.findUnique({
      where: { id: productId },
      include: {
        draftVersion: true,
        currentPublishedVersion: { select: { id: true, status: true } },
      },
    });

    if (!product?.draftVersion) {
      throw new BadRequestError("No draft to publish");
    }

    if (product.draftVersion.status !== ProductVersionStatus.DRAFT) {
      throw new BadRequestError("Draft version is not in DRAFT status");
    }

    if (
      expectedDraftUpdatedAt &&
      product.draftVersion.updatedAt.getTime() !==
        expectedDraftUpdatedAt.getTime()
    ) {
      throw new ConflictError(
        "Draft was modified by another session; refresh and try again",
      );
    }

    const draftId = product.draftVersion.id;
    const previousPublishedId = product.currentPublishedVersionId;

    if (previousPublishedId) {
      await tx.productVersion.update({
        where: { id: previousPublishedId },
        data: { status: ProductVersionStatus.ARCHIVED },
      });
    }

    await tx.productVersion.update({
      where: { id: draftId },
      data: { status: ProductVersionStatus.PUBLISHED },
    });

    await tx.product.update({
      where: { id: productId },
      data: {
        currentPublishedVersionId: draftId,
        draftVersionId: null,
      },
    });

    await ProductVersionServiceBase.recomputeVariantEffectivePriceBounds(
      tx,
      draftId,
    );
    await ProductVersionServiceBase.recomputeTotalVariantStock(tx, draftId);
  }

  /**
   * Delete draft version and clear Product.draftVersionId.
   */
  static async discardDraft(
    tx: Prisma.TransactionClient,
    productId: string,
  ): Promise<void> {
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { draftVersionId: true },
    });

    if (!product?.draftVersionId) {
      throw new BadRequestError("No draft to discard");
    }

    const draftId = product.draftVersionId;

    await tx.product.update({
      where: { id: productId },
      data: { draftVersionId: null },
    });

    await tx.productVersion.delete({
      where: { id: draftId },
    });
  }

  /**
   * Create first published version (version 1) with optional variant matrix.
   */
  static async createInitialPublishedVersion(
    tx: Prisma.TransactionClient,
    productId: string,
    data: CreateInitialPublishedVersionInput,
  ): Promise<string> {
    const version = await tx.productVersion.create({
      data: {
        productId,
        status: ProductVersionStatus.PUBLISHED,
        versionNumber: 1,
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        stock: data.hasVariants ? 0 : data.stock,
        totalVariantStock: data.hasVariants ? 0 : data.stock,
        hasVariants: data.hasVariants,
        images: data.imageUrls?.length
          ? {
              create: data.imageUrls.map((url) => ({ url })),
            }
          : undefined,
      },
    });

    if (data.hasVariants && data.variantOptions?.length) {
      const variantsWithImages = (data.variants ?? []).filter(
        (v) => v.imageUrl,
      );
      let imageUrlToId: Map<string, string> | undefined;
      if (variantsWithImages.length > 0) {
        const images = await tx.image.findMany({
          where: { productVersionId: version.id },
          select: { id: true, url: true },
        });
        imageUrlToId = new Map(images.map((img) => [img.url, img.id]));
      }

      await ProductVersionService.writeVariantMatrix(
        tx,
        version.id,
        data.variantOptions,
        data.variants ?? [],
        imageUrlToId,
      );
    } else {
      await ProductVersionServiceBase.recomputeVariantEffectivePriceBounds(
        tx,
        version.id,
      );
      await ProductVersionServiceBase.recomputeTotalVariantStock(
        tx,
        version.id,
      );
    }

    if (data.addonGroups?.length) {
      await ProductVersionService.writeAddonGroups(
        tx,
        version.id,
        data.addonGroups,
      );
    }

    await tx.product.update({
      where: { id: productId },
      data: { currentPublishedVersionId: version.id },
    });

    return version.id;
  }
}

export const ProductVersionService = traceStaticClass(
  ProductVersionServiceBase,
);
