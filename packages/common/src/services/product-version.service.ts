import type { Prisma } from "@dukkani/db/prisma/generated";
import { ProductVersionStatus } from "@dukkani/db/prisma/generated/enums";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import type {
  VariantInput,
  VariantOptionInput,
} from "../schemas/variant/input";

type Tx = Prisma.TransactionClient;

const versionTreeInclude = {
  images: true,
  variantOptions: { include: { values: true } },
  variants: { include: { selections: true } },
} as const;

class ProductVersionServiceBase {
  /**
   * Next monotonic version number for a product (1-based).
   */
  static async nextVersionNumber(tx: Tx, productId: string): Promise<number> {
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
    tx: Tx,
    productId: string,
  ): Promise<string> {
    const product = await tx.product.findUnique({
      where: { id: productId },
      include: {
        currentPublishedVersion: { include: versionTreeInclude },
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
      },
      include: {
        variantOptions: { include: { values: true } },
      },
    });

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
      await tx.productVariant.create({
        data: {
          productVersionId: draft.id,
          sku: v.sku,
          price: v.price,
          stock: v.stock,
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
    tx: Tx,
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
   * Replace options + variants for a version (used after deletes for draft updates).
   */
  static async writeVariantMatrix(
    tx: Tx,
    productVersionId: string,
    variantOptions: VariantOptionInput[],
    variants: VariantInput[],
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
          price: variant.price,
          stock: variant.stock,
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
  }

  /**
   * Clears variant matrix on a version (options, values, variants, selections via cascade).
   */
  static async clearVariantMatrix(
    tx: Tx,
    productVersionId: string,
  ): Promise<void> {
    await tx.productVariant.deleteMany({ where: { productVersionId } });
    await tx.productVariantOption.deleteMany({ where: { productVersionId } });
  }

  /**
   * Publish draft: archive previous published, promote draft, clear draft pointer.
   */
  static async publishDraft(
    tx: Tx,
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
  }

  /**
   * Delete draft version and clear Product.draftVersionId.
   */
  static async discardDraft(tx: Tx, productId: string): Promise<void> {
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
    tx: Tx,
    productId: string,
    data: {
      name: string;
      description?: string | null;
      price: number;
      stock: number;
      hasVariants: boolean;
      imageUrls?: string[];
      variantOptions?: VariantOptionInput[];
      variants?: VariantInput[];
    },
  ): Promise<string> {
    const version = await tx.productVersion.create({
      data: {
        productId,
        status: ProductVersionStatus.PUBLISHED,
        versionNumber: 1,
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        stock: data.stock,
        hasVariants: data.hasVariants,
        images: data.imageUrls?.length
          ? {
              create: data.imageUrls.map((url) => ({ url })),
            }
          : undefined,
      },
    });

    if (data.hasVariants && data.variantOptions?.length) {
      await ProductVersionService.writeVariantMatrix(
        tx,
        version.id,
        data.variantOptions,
        data.variants ?? [],
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
