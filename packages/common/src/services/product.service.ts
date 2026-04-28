import { BadRequestError, NotFoundError } from "@dukkani/common/errors";
import { database } from "@dukkani/db";
import type { Prisma } from "@dukkani/db/prisma/generated";
import { ProductAddonSelectionType, ProductType } from "@dukkani/db/prisma/generated/enums";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import type { PrismaClient } from "@prisma/client/extension";
import { BundleItemQuery } from "../entities/bundle-item/query";
import { ProductQuery } from "../entities/product/query";
import type {
  ProductAddonGroupOrderPricingDbData,
  ProductAddonOptionOrderPricingDbData,
} from "../entities/product-addon/query";
import {
  type ProductVersionOrderPricingDbData,
  ProductVersionQuery,
} from "../entities/product-version/query";
import { decimalLikeToNumber } from "../lib/decimal/decimal-like";
import { computeBundleEffectiveStock } from "../lib/bundle/compute-bundle-stock";
import { effectiveVariantUnitPrice } from "../lib/pricing/variant-effective-price";
import { generateProductId } from "../lib/id/generate-id";
import { BundleService } from "./bundle.service";
import { ProductVersionService } from "./product-version.service";
import {
  type BundleChildLine,
  bundleChildLineSchema,
  type OrderItemAddonSnapshot,
  orderItemAddonSnapshotSchema,
  type PricedProductLineItem,
  pricedProductLineItemSchema,
} from "../schemas/order/base";
import { type ProductStockUpdateLine } from "../schemas/product/base";
import type { ProductLineItem } from "../schemas/product/input";

/**
 * Product service - Shared business logic for product operations
 * All methods are automatically traced via traceStaticClass
 */
class ProductServiceBase {
  /**
   * Generate product ID using store slug
   */
  static generateProductId(storeSlug: string): string {
    return generateProductId(storeSlug);
  }

  /**
   * Variant products with a non-empty matrix require `variantId` on each line;
   * simple products must not send `variantId`.
   */
  private static assertCatalogLineVariantRules(
    items: ProductLineItem[],
    productMap: Map<
      string,
      {
        currentPublishedVersion: {
          hasVariants: boolean;
          variants: Array<{ id: string }>;
        } | null;
      }
    >,
  ): void {
    for (const item of items) {
      const row = productMap.get(item.productId);
      const pub = row?.currentPublishedVersion;
      if (!pub) {
        throw new NotFoundError(
          `Product ${item.productId} not found or not available for this store`,
        );
      }
      const requiresVariant = pub.hasVariants && pub.variants.length > 0;
      if (requiresVariant) {
        if (!item.variantId) {
          throw new BadRequestError("Select a variant for this product");
        }
        const ok = pub.variants.some((v) => v.id === item.variantId);
        if (!ok) {
          throw new BadRequestError(
            "This product was updated. Remove it from your cart and add it again.",
          );
        }
      } else if (item.variantId) {
        throw new BadRequestError(
          "This product has no variants. Remove it from your cart and add it again.",
        );
      }
    }
  }

  private static resolveAddonSelectionsForPublishedVersion(
    pub: { addonGroups: ProductAddonGroupOrderPricingDbData[] },
    selections: Array<{ addonOptionId: string; quantity: number }>,
  ): {
    unitAddonTotal: number;
    addonSnapshots: OrderItemAddonSnapshot[];
    stockRows: Array<{
      optionName: string;
      selectionQty: number;
      optionStock: number;
    }>;
  } {
    const flat = new Map<
      string,
      {
        group: ProductAddonGroupOrderPricingDbData;
        option: ProductAddonOptionOrderPricingDbData;
      }
    >();
    for (const g of pub.addonGroups) {
      for (const o of g.options) {
        flat.set(o.id, { group: g, option: o });
      }
    }

    const byGroup = new Map<
      string,
      Array<{
        addonOptionId: string;
        quantity: number;
        group: ProductAddonGroupOrderPricingDbData;
        option: ProductAddonOptionOrderPricingDbData;
      }>
    >();

    for (const sel of selections) {
      const hit = flat.get(sel.addonOptionId);
      if (!hit) {
        throw new BadRequestError(
          "This product was updated. Remove it from your cart and add it again.",
        );
      }
      const list = byGroup.get(hit.group.id) ?? [];
      list.push({
        addonOptionId: sel.addonOptionId,
        quantity: sel.quantity,
        group: hit.group,
        option: hit.option,
      });
      byGroup.set(hit.group.id, list);
    }

    for (const g of pub.addonGroups) {
      const picked = byGroup.get(g.id) ?? [];
      if (g.required && picked.length === 0) {
        throw new BadRequestError(
          `Add-on group "${g.name}" requires a selection`,
        );
      }
      if (
        g.selectionType === ProductAddonSelectionType.SINGLE &&
        picked.length > 1
      ) {
        throw new BadRequestError(
          `Only one option allowed in add-on group "${g.name}"`,
        );
      }
    }

    let unitAddonTotal = 0;
    const addonSnapshots: OrderItemAddonSnapshot[] = [];
    const stockRows: Array<{
      optionName: string;
      selectionQty: number;
      optionStock: number;
    }> = [];

    for (const [, picked] of byGroup) {
      for (const row of picked) {
        const pd = decimalLikeToNumber(row.option.priceDelta);
        unitAddonTotal += pd * row.quantity;
        addonSnapshots.push(
          orderItemAddonSnapshotSchema.parse({
            addonOptionId: row.addonOptionId,
            groupName: row.group.name,
            optionName: row.option.name,
            priceDelta: pd,
            quantity: row.quantity,
          }),
        );
        stockRows.push({
          optionName: row.option.name,
          selectionQty: row.quantity,
          optionStock: row.option.stock,
        });
      }
    }

    return { unitAddonTotal, addonSnapshots, stockRows };
  }

  private static assertAddonStockForLine(
    lineQuantity: number,
    stockRows: Array<{
      optionName: string;
      selectionQty: number;
      optionStock: number;
    }>,
  ): void {
    for (const s of stockRows) {
      const need = lineQuantity * s.selectionQty;
      if (s.optionStock < need) {
        throw new BadRequestError(
          `Insufficient stock for add-on "${s.optionName}"`,
        );
      }
    }
  }

  /**
   * Server-side prices from the **current published** product version.
   * Stale cart lines (variant no longer on that version) throw {@link BadRequestError}.
   * For bundle products, resolves bundleChildren and populates them on the priced item
   * so the order service can route stock decrements to the correct child products.
   */
  static async getOrderItemPrices(
    items: ProductLineItem[],
    storeId: string,
    tx?: PrismaClient,
  ): Promise<PricedProductLineItem[]> {
    if (items.length === 0) {
      return [];
    }

    const client = tx ?? database;
    const productIds = [...new Set(items.map((i) => i.productId))];

    // Load all products — include type to split bundles from standard
    const products = await client.product.findMany({
      where: {
        id: { in: productIds },
        storeId,
        ...ProductQuery.getPublishableWhere(),
      },
      select: {
        id: true,
        type: true,
        currentPublishedVersion: {
          select: ProductVersionQuery.getOrderPricingSelect(),
        },
      },
    });

    type ProductWithPrices = (typeof products)[number];
    const productMap = new Map<string, ProductWithPrices>(
      products.map((p: ProductWithPrices) => [p.id, p]),
    );

    const standardItems = items.filter(
      (i) => (productMap.get(i.productId) as ProductWithPrices | undefined)?.type !== ProductType.BUNDLE,
    );
    ProductServiceBase.assertCatalogLineVariantRules(standardItems, productMap);

    const result: PricedProductLineItem[] = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      const pub = product?.currentPublishedVersion;
      if (!product || !pub) {
        throw new NotFoundError(
          `Product ${item.productId} not found or not available for this store`,
        );
      }

      if (product.type === ProductType.BUNDLE) {
        // Bundles: price comes from version.price (merchant-set), no variants/addons
        const basePrice = (() => {
          const n = decimalLikeToNumber(pub.price);
          return Number.isFinite(n) ? n : null;
        })();
        if (basePrice == null) {
          throw new BadRequestError(
            "This bundle has no valid price. Remove it from your cart and add it again.",
          );
        }

        // Resolve bundle children for stock routing and OrderItemBundleChild creation
        const bundleItems = await client.bundleItem.findMany({
          where: { bundleVersionId: pub.id },
          select: BundleItemQuery.getOrderPricingSelect(),
        });
        type BundlePricingItem = (typeof bundleItems)[number];

        const bundleChildren: BundleChildLine[] = (bundleItems as BundlePricingItem[]).map((bi) => {
          const childPubVersionId =
            bi.childProduct.currentPublishedVersion?.id ??
            bi.childProduct.currentPublishedVersionId ??
            "";
          const trackStock = bi.childVariantId
            ? (bi.childVariant?.trackStock ?? true)
            : true;

          return bundleChildLineSchema.parse({
            childProductId: bi.childProductId,
            childVariantId: bi.childVariantId ?? undefined,
            childProductVersionId: childPubVersionId,
            itemQty: bi.itemQty,
            quantity: bi.itemQty * item.quantity,
            trackStock,
          });
        });

        result.push(
          pricedProductLineItemSchema.parse({
            productId: item.productId,
            variantId: undefined,
            quantity: item.quantity,
            addonSelections: [],
            price: basePrice,
            productVersionId: pub.id,
            productNameAtCheckout: pub.name,
            addonSnapshots: [],
            isBundle: true,
            bundleChildren,
          }),
        );
        continue;
      }

      // Standard product path (unchanged)
      const variant = item.variantId
        ? pub.variants.find(
            (v: ProductVersionOrderPricingDbData["variants"][number]) =>
              v.id === item.variantId,
          )
        : undefined;
      if (item.variantId && variant === undefined) {
        throw new BadRequestError(
          "This product was updated. Remove it from your cart and add it again.",
        );
      }
      const basePrice = variant
        ? effectiveVariantUnitPrice(variant.price, pub.price)
        : (() => {
            const n = decimalLikeToNumber(pub.price);
            return Number.isFinite(n) ? n : null;
          })();
      if (basePrice == null) {
        throw new BadRequestError(
          "This product has no valid price. Remove it from your cart and add it again.",
        );
      }

      const selections = item.addonSelections ?? [];
      const { unitAddonTotal, addonSnapshots } =
        ProductServiceBase.resolveAddonSelectionsForPublishedVersion(
          { addonGroups: pub.addonGroups },
          selections,
        );

      result.push(
        pricedProductLineItemSchema.parse({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          addonSelections: selections,
          price: basePrice + unitAddonTotal,
          productVersionId: pub.id,
          productNameAtCheckout: pub.name,
          addonSnapshots,
        }),
      );
    }

    return result;
  }

  /**
   * Validate that products exist and belong to the specified store
   */
  static async validateProductsExist(
    productIds: string[],
    storeId: string,
    tx?: PrismaClient,
  ): Promise<void> {
    const client = tx ?? database;
    const products = await client.product.findMany({
      where: {
        id: { in: productIds },
        storeId,
      },
      select: {
        id: true,
      },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundError(
        "One or more products not found or don't belong to this store",
      );
    }
  }

  /**
   * Check stock availability for order items
   * - For items with variantId: checks ProductVariant.stock
   * - For items without variantId: checks Product.stock
   * - Add-on options: aggregate line quantity × selection quantity per option
   * Aggregates quantities by (productId, variantId) to handle duplicates correctly
   */
  static async checkStockAvailability(
    items: ProductLineItem[],
    storeId: string,
    tx?: PrismaClient,
  ): Promise<void> {
    addSpanAttributes({
      "product.store_id": storeId,
      "product.items_count": items.length,
    });

    const client = tx ?? database;

    const lineProductIds = [...new Set(items.map((i) => i.productId))];

    // Detect bundle vs standard products
    const productTypeRows =
      lineProductIds.length > 0
        ? await client.product.findMany({
            where: {
              id: { in: lineProductIds },
              storeId,
            },
            select: { id: true, type: true, currentPublishedVersionId: true },
          })
        : [];

    type ProductTypeRow = (typeof productTypeRows)[number];
    const productTypeMap = new Map<string, ProductTypeRow>(
      productTypeRows.map((p: ProductTypeRow) => [p.id, p]),
    );
    const bundleLineItems = items.filter(
      (i) => productTypeMap.get(i.productId)?.type === ProductType.BUNDLE,
    );
    const standardItems = items.filter(
      (i) => productTypeMap.get(i.productId)?.type !== ProductType.BUNDLE,
    );

    // Check bundle stock by resolving children
    for (const bundleLine of bundleLineItems) {
      const pubVersionId = productTypeMap.get(bundleLine.productId)?.currentPublishedVersionId;
      if (!pubVersionId) {
        throw new NotFoundError(
          `Bundle ${bundleLine.productId} not found or not published`,
        );
      }

      const bundleItems = await client.bundleItem.findMany({
        where: { bundleVersionId: pubVersionId },
        select: BundleItemQuery.getStockCheckSelect(),
      });
      type BundleItemRow = (typeof bundleItems)[number];

      // Verify child variants still belong to their child's currentPublishedVersion
      for (const bi of bundleItems as BundleItemRow[]) {
        if (bi.childVariantId) {
          const pubVariants = bi.childProduct.currentPublishedVersion?.variants ?? [];
          type PubVariant = (typeof pubVariants)[number];
          const variantIsValid = pubVariants.some((v: PubVariant) => v.id === bi.childVariantId);
          if (!variantIsValid) {
            throw new BadRequestError(
              "A bundle component was updated. Remove the bundle from your cart and add it again.",
            );
          }
        }
      }

      const slots = (bundleItems as BundleItemRow[]).map((bi) => {
        if (bi.childVariantId && bi.childVariant) {
          return {
            stock: bi.childVariant.stock,
            trackStock: bi.childVariant.trackStock,
            itemQty: bi.itemQty,
          };
        }
        const pub = bi.childProduct.currentPublishedVersion;
        return {
          stock: pub?.stock ?? 0,
          trackStock: true,
          itemQty: bi.itemQty,
        };
      });

      const effective = computeBundleEffectiveStock(slots);
      if (effective < bundleLine.quantity) {
        throw new BadRequestError(
          `Insufficient stock for bundle ${bundleLine.productId}`,
        );
      }
    }

    const standardLineProductIds = [...new Set(standardItems.map((i) => i.productId))];
    if (standardLineProductIds.length > 0) {
      const catalogRows = await client.product.findMany({
        where: {
          id: { in: standardLineProductIds },
          storeId,
          ...ProductQuery.getPublishableWhere(),
        },
        select: {
          id: true,
          currentPublishedVersion: {
            select: {
              hasVariants: true,
              variants: { select: { id: true } },
            },
          },
        },
      });
      type CatalogRow = (typeof catalogRows)[number];
      const catalogMap = new Map<string, CatalogRow>(
        catalogRows.map((p: CatalogRow) => [p.id, p]),
      );
      ProductServiceBase.assertCatalogLineVariantRules(standardItems, catalogMap);
    }

    // Aggregate by (productId, variantId) for standard (non-bundle) items only
    const requiredByKey = new Map<string, number>();
    for (const { productId, variantId, quantity } of standardItems) {
      const key = variantId ? `${productId}:${variantId}` : `${productId}:`;
      requiredByKey.set(key, (requiredByKey.get(key) ?? 0) + quantity);
    }

    // Split into variant items and product-only items
    const variantItems: Array<{
      productId: string;
      variantId: string;
      quantity: number;
    }> = [];
    const productItems: Array<{ productId: string; quantity: number }> = [];
    for (const [key, quantity] of requiredByKey.entries()) {
      const colonIdx = key.indexOf(":");
      const productId = colonIdx >= 0 ? key.slice(0, colonIdx) : key;
      const variantId = colonIdx >= 0 ? key.slice(colonIdx + 1) : "";
      if (variantId) {
        variantItems.push({ productId, variantId, quantity });
      } else {
        productItems.push({ productId, quantity });
      }
    }

    // Check variant stock — variant must belong to the product's **current published** version
    if (variantItems.length > 0) {
      const uniqueProductIds = [
        ...new Set(variantItems.map((i) => i.productId)),
      ];
      const products = await client.product.findMany({
        where: {
          id: { in: uniqueProductIds },
          storeId,
          ...ProductQuery.getPublishableWhere(),
        },
        select: {
          id: true,
          currentPublishedVersion: {
            select: {
              variants: { select: { id: true, stock: true } },
            },
          },
        },
      });
      type VariantStockProduct = (typeof products)[number];
      const productMap = new Map<string, VariantStockProduct>(
        products.map((p: VariantStockProduct) => [p.id, p]),
      );

      for (const item of variantItems) {
        const row = productMap.get(item.productId);
        const pub = row?.currentPublishedVersion;
        if (!pub) {
          throw new NotFoundError(
            `Product ${item.productId} not found or not available for this store`,
          );
        }
        const variant = pub.variants.find(
          (v: { id: string; stock: number }) => v.id === item.variantId,
        );
        if (!variant) {
          throw new BadRequestError(
            "This product was updated. Remove it from your cart and add it again.",
          );
        }
        if (variant.stock < item.quantity) {
          throw new BadRequestError(
            `Insufficient stock for product ${item.productId} (variant ${item.variantId})`,
          );
        }
      }
    }

    // Check base (no-variant) stock on the published version
    if (productItems.length > 0) {
      const uniqueProductIds = [
        ...new Set(productItems.map((i) => i.productId)),
      ];
      const products = await client.product.findMany({
        where: {
          id: { in: uniqueProductIds },
          storeId,
          ...ProductQuery.getPublishableWhere(),
        },
        select: {
          id: true,
          currentPublishedVersion: { select: { stock: true } },
        },
      });

      if (products.length !== uniqueProductIds.length) {
        throw new NotFoundError(
          "One or more products not found or don't belong to this store",
        );
      }

      for (const item of productItems) {
        const product = products.find(
          (p: (typeof products)[number]) => p.id === item.productId,
        );
        const stock = product?.currentPublishedVersion?.stock;
        if (stock === undefined || stock < item.quantity) {
          throw new BadRequestError(
            `Insufficient stock for product ${item.productId}`,
          );
        }
      }
    }

    // Addon stock check only applies to standard (non-bundle) products
    if (standardItems.length > 0) {
      const productsForAddons = await client.product.findMany({
        where: {
          id: { in: standardLineProductIds },
          storeId,
          ...ProductQuery.getPublishableWhere(),
        },
        select: {
          id: true,
          currentPublishedVersion: {
            select: ProductVersionQuery.getOrderPricingSelect(),
          },
        },
      });
      type AddonProductRow = (typeof productsForAddons)[number];
      const addonProductMap = new Map<string, AddonProductRow>(
        productsForAddons.map((p: AddonProductRow) => [p.id, p]),
      );

      for (const item of standardItems) {
        const row = addonProductMap.get(item.productId);
        const pub = row?.currentPublishedVersion;
        if (!row || !pub) {
          throw new NotFoundError(
            `Product ${item.productId} not found or not available for this store`,
          );
        }
        const selections = item.addonSelections ?? [];
        const { stockRows } =
          ProductServiceBase.resolveAddonSelectionsForPublishedVersion(
            { addonGroups: pub.addonGroups },
            selections,
          );
        ProductServiceBase.assertAddonStockForLine(item.quantity, stockRows);
      }
    }

    addSpanAttributes({
      "product.variant_items": variantItems.length,
      "product.simple_items": productItems.length,
      "product.total_quantity": Array.from(requiredByKey.values()).reduce(
        (a, b) => a + b,
        0,
      ),
    });
  }

  /**
   * Update product stock
   */
  static async updateProductStock(
    productId: string,
    quantity: number,
    operation: "increment" | "decrement",
    tx?: PrismaClient,
  ): Promise<void> {
    addSpanAttributes({
      "product.id": productId,
      "product.quantity": quantity,
      "product.operation": operation,
    });

    const client = tx ?? database;
    const product = await client.product.findUnique({
      where: { id: productId },
      select: { currentPublishedVersionId: true },
    });
    if (!product?.currentPublishedVersionId) {
      throw new NotFoundError("Product has no published version");
    }
    await client.productVersion.update({
      where: { id: product.currentPublishedVersionId },
      data: {
        stock: {
          [operation]: quantity,
        },
      },
    });
    await ProductVersionService.recomputeTotalVariantStock(
      client,
      product.currentPublishedVersionId,
    );
  }

  /**
   * Update {@link ProductAddonOption} stock in bulk (aggregated by option id).
   */
  static async updateAddonOptionStocks(
    updates: Array<{ optionId: string; quantity: number }>,
    operation: "increment" | "decrement",
    tx?: PrismaClient,
  ): Promise<void> {
    if (updates.length === 0) return;

    const client = tx ?? database;
    const aggregated = new Map<string, number>();
    for (const u of updates) {
      aggregated.set(
        u.optionId,
        (aggregated.get(u.optionId) ?? 0) + u.quantity,
      );
    }

    await Promise.all(
      [...aggregated.entries()].map(([optionId, quantity]) =>
        client.productAddonOption.update({
          where: { id: optionId },
          data: {
            stock: { [operation]: quantity },
          },
        }),
      ),
    );
  }

  /**
   * Update multiple product stocks
   * - For items with variantId: updates ProductVariant.stock
   * - For items without variantId: updates Product.stock
   * Aggregates quantities by (productId, variantId) to handle duplicates correctly
   */
  static async updateMultipleProductStocks(
    updates: ProductStockUpdateLine[],
    operation: "increment" | "decrement",
    tx?: PrismaClient,
  ): Promise<void> {
    addSpanAttributes({
      "product.updates_count": updates.length,
      "product.operation": operation,
    });
    const client = tx ?? database;

    // Guard: bundle productIds must never be passed here — stock lives on children
    const uniqueUpdateProductIds = [...new Set(updates.map((u) => u.productId))];
    if (uniqueUpdateProductIds.length > 0) {
      const bundleCheck = await client.product.findMany({
        where: { id: { in: uniqueUpdateProductIds }, type: ProductType.BUNDLE },
        select: { id: true },
      });
      type BundleCheckRow = (typeof bundleCheck)[number];
      if ((bundleCheck as BundleCheckRow[]).length > 0) {
        throw new BadRequestError(
          "Bundle stock cannot be directly updated. Update the child products instead.",
        );
      }
    }

    // Aggregate by (productId, variantId) - use empty string for non-variant items
    const aggregatedByKey = new Map<string, number>();
    for (const { productId, variantId, quantity } of updates) {
      const key = variantId ? `${productId}:${variantId}` : `${productId}:`;
      aggregatedByKey.set(key, (aggregatedByKey.get(key) ?? 0) + quantity);
    }

    // Split into variant updates and product updates
    const variantUpdates: Array<{
      productId: string;
      variantId: string;
      quantity: number;
    }> = [];
    const productUpdates: Array<{ productId: string; quantity: number }> = [];
    for (const [key, quantity] of aggregatedByKey.entries()) {
      const colonIdx = key.indexOf(":");
      const productId = colonIdx >= 0 ? key.slice(0, colonIdx) : key;
      const variantId = colonIdx >= 0 ? key.slice(colonIdx + 1) : "";
      if (variantId) {
        variantUpdates.push({ productId, variantId, quantity });
      } else {
        productUpdates.push({ productId, quantity });
      }
    }

    // Update variant stocks (only rows on the current published version)
    const versionIdsToRecompute = new Set<string>();
    if (variantUpdates.length > 0) {
      const uniqueVariantIds = [
        ...new Set(variantUpdates.map((u) => u.variantId)),
      ];
      const variantRows = await client.productVariant.findMany({
        where: { id: { in: uniqueVariantIds } },
        select: {
          id: true,
          productVersionId: true,
          productVersion: {
            select: {
              product: {
                select: {
                  id: true,
                  currentPublishedVersionId: true,
                },
              },
            },
          },
        },
      });
      type VariantRow = (typeof variantRows)[number];
      const rowById = new Map<string, VariantRow>(
        variantRows.map((r: VariantRow) => [r.id, r]),
      );

      await Promise.all(
        variantUpdates.map(({ productId, variantId, quantity }) => {
          const row = rowById.get(variantId);
          const pubId =
            row?.productVersion.product.currentPublishedVersionId ?? null;
          if (
            !row ||
            !pubId ||
            row.productVersionId !== pubId ||
            row.productVersion.product.id !== productId
          ) {
            throw new BadRequestError(
              "Cannot adjust stock: variant is not on the live catalog version",
            );
          }
          versionIdsToRecompute.add(pubId);
          return client.productVariant.update({
            where: { id: variantId },
            data: {
              stock: {
                [operation]: quantity,
              },
            },
          });
        }),
      );
    }

    // Update base stock on the published ProductVersion
    if (productUpdates.length > 0) {
      const uniqueProductIds = [
        ...new Set(productUpdates.map((u) => u.productId)),
      ];
      const products = await client.product.findMany({
        where: { id: { in: uniqueProductIds } },
        select: { id: true, currentPublishedVersionId: true },
      });
      type PubProduct = (typeof products)[number];
      const pubByProduct = new Map<string, string | null>(
        products.map((p: PubProduct) => [p.id, p.currentPublishedVersionId]),
      );

      await Promise.all(
        productUpdates.map(({ productId, quantity }) => {
          const versionId = pubByProduct.get(productId);
          if (!versionId) {
            throw new NotFoundError(
              `Product ${productId} has no published version`,
            );
          }
          versionIdsToRecompute.add(versionId);
          return client.productVersion.update({
            where: { id: versionId },
            data: {
              stock: {
                [operation]: quantity,
              },
            },
          });
        }),
      );
    }

    await Promise.all(
      [...versionIdsToRecompute].map((vid) =>
        ProductVersionService.recomputeTotalVariantStock(client, vid),
      ),
    );

    // Recompute effective stock for all PUBLISHED bundle versions that reference
    // any of the products/variants that just had their stock changed
    const updatedVariantIds = variantUpdates.map((u) => u.variantId);
    await BundleService.recomputeBundlesReferencingProducts(
      client as unknown as Prisma.TransactionClient,
      uniqueUpdateProductIds,
      updatedVariantIds,
    );

    addSpanAttributes({
      "product.variants_updated": variantUpdates.length,
      "product.products_updated": productUpdates.length,
      "product.total_quantity_change": Array.from(
        aggregatedByKey.values(),
      ).reduce((a, b) => a + b, 0),
    });
  }
}

export const ProductService = traceStaticClass(ProductServiceBase);
