import { z } from "zod";
import { productLineItemSchema } from "../product/input";

/**
 * One child-product stock slot within a bundle PricedProductLineItem.
 * Populated by getOrderItemPrices for bundle products and carried through
 * to order creation so the service knows which children to decrement.
 */
export const bundleChildLineSchema = z.object({
  childProductId: z.string().min(1),
  childVariantId: z.string().min(1).optional(),
  childProductVersionId: z.string().min(1),
  itemQty: z.number().int().min(1),
  quantity: z.number().int().min(1),
  trackStock: z.boolean(),
});

export type BundleChildLine = z.infer<typeof bundleChildLineSchema>;

export const orderItemAddonSnapshotSchema = z.object({
  addonOptionId: z.string().min(1),
  groupName: z.string().min(1),
  optionName: z.string().min(1),
  priceDelta: z.number(),
  quantity: z.number().int().min(1),
});

/**
 * Cart line plus server-resolved pricing from the published product version.
 * Extends {@link productLineItemSchema} (including duplicate add-on option refinement).
 * For bundle products, `isBundle` is true and `bundleChildren` holds the resolved
 * child slots used to route stock decrements and write OrderItemBundleChild rows.
 */
export const pricedProductLineItemSchema = productLineItemSchema.extend({
  price: z.number().nonnegative(),
  productVersionId: z.string().min(1),
  productNameAtCheckout: z.string().min(1),
  addonSnapshots: z.array(orderItemAddonSnapshotSchema),
  isBundle: z.boolean().optional(),
  bundleChildren: z.array(bundleChildLineSchema).optional(),
});

export type OrderItemAddonSnapshot = z.infer<
  typeof orderItemAddonSnapshotSchema
>;
export type PricedProductLineItem = z.infer<typeof pricedProductLineItemSchema>;
