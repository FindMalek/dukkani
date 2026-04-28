import { ProductVersionEntity } from "@dukkani/common/entities/product-version/entity";
import { ProductVersionQuery } from "@dukkani/common/entities/product-version/query";
import { buildProductPriceDisplay } from "@dukkani/common/lib/pricing/product-price-display";
import { getBundleInputSchema } from "@dukkani/common/schemas/bundle/input";
import type { BundlePublicOutput } from "@dukkani/common/schemas/bundle/output";
import { bundlePublicOutputSchema } from "@dukkani/common/schemas/bundle/output";
import { database } from "@dukkani/db";
import { ProductType, ProductVersionStatus } from "@dukkani/db/prisma/generated/enums";
import { ORPCError } from "@orpc/server";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure } from "../../procedures";

export const bundleRouter = {
  getByIdPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(getBundleInputSchema)
    .output(bundlePublicOutputSchema)
    .handler(async ({ input }): Promise<BundlePublicOutput> => {
      const product = await database.product.findUnique({
        where: { id: input.id, type: ProductType.BUNDLE, published: true },
        select: {
          id: true,
          published: true,
          currentPublishedVersion: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              totalVariantStock: true,
              status: true,
              images: { select: { url: true } },
              ...ProductVersionQuery.getBundleItemsInclude(),
            },
          },
        },
      });

      const v = product?.currentPublishedVersion;

      if (!product || !v || v.status !== ProductVersionStatus.PUBLISHED) {
        throw new ORPCError("NOT_FOUND", { message: "Bundle not found" });
      }

      const versionPrice = Number(v.price);

      const bundleItems = ProductVersionEntity.getBundleItemsRo(v.bundleItems);

      // Collect all child product images (flattened)
      type BundleItemType = (typeof v.bundleItems)[number];
      const childImageUrls = v.bundleItems.flatMap((bi: BundleItemType) =>
        (bi.childProduct.currentPublishedVersion?.images ?? []).map(
          (img: { url: string }) => img.url,
        ),
      );

      return {
        id: product.id,
        name: v.name,
        description: v.description,
        price: versionPrice,
        effectiveStock: v.totalVariantStock,
        published: product.published,
        imageUrls: v.images.map((img: { url: string }) => img.url),
        childImageUrls,
        bundleItems,
        priceDisplay: buildProductPriceDisplay({
          hasVariants: false,
          versionPrice,
          variantEffectivePriceMin: null,
          variantEffectivePriceMax: null,
        }),
      };
    }),
};
