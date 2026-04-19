import { BadRequestError, NotFoundError } from "@dukkani/common/errors";
import { database } from "@dukkani/db";
import { ProductAddonSelectionType } from "@dukkani/db/prisma/generated/enums";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import type { PrismaClient } from "@prisma/client/extension";
import { ProductQuery } from "../entities/product/query";
import type {
  ProductAddonGroupOrderPricingDbData,
  ProductAddonOptionOrderPricingDbData,
} from "../entities/product-addon/query";
import {
  type ProductVersionOrderPricingDbData,
  ProductVersionQuery,
} from "../entities/product-version/query";
import {
  type OrderItemAddonSnapshot,
  orderItemAddonSnapshotSchema,
  type PricedProductLineItem,
  pricedProductLineItemSchema,
} from "../schemas/order/base";
import { type ProductStockUpdateLine } from "../schemas/product/base";
import type { ProductLineItem } from "../schemas/product/input";
import { decimalLikeToNumber } from "../utils/decimal-like";
import { generateProductId } from "../utils/generate-id";

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

    const products = await client.product.findMany({
      where: {
        id: { in: productIds },
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

    type ProductWithPrices = (typeof products)[number];
    const productMap = new Map<string, ProductWithPrices>(
      products.map((p: ProductWithPrices) => [p.id, p]),
    );

    return items.map((item) => {
      const product = productMap.get(item.productId);
      const pub = product?.currentPublishedVersion;
      if (!product || !pub) {
        throw new NotFoundError(
          `Product ${item.productId} not found or not available for this store`,
        );
      }
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
        ? decimalLikeToNumber(variant.price)
        : decimalLikeToNumber(pub.price);

      const selections = item.addonSelections ?? [];
      const { unitAddonTotal, addonSnapshots } =
        ProductServiceBase.resolveAddonSelectionsForPublishedVersion(
          { addonGroups: pub.addonGroups },
          selections,
        );

      return pricedProductLineItemSchema.parse({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        addonSelections: selections,
        price: basePrice + unitAddonTotal,
        productVersionId: pub.id,
        productNameAtCheckout: pub.name,
        addonSnapshots,
      });
    });
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

    // Aggregate by (productId, variantId) - use empty string for non-variant items
    const requiredByKey = new Map<string, number>();
    for (const { productId, variantId, quantity } of items) {
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

    const lineProductIds = [...new Set(items.map((i) => i.productId))];
    const productsForAddons = await client.product.findMany({
      where: {
        id: { in: lineProductIds },
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

    for (const item of items) {
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
      const pubByProduct = new Map(
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
