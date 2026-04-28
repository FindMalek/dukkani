import { z } from "zod";
import { imageSimpleOutputSchema } from "../image/output";
import { orderItemSimpleOutputSchema } from "../order-item/output";
import { productPriceDisplaySchema } from "../product/output";
import { bundleItemOutputSchema } from "../bundle-item/output";

export const bundleIncludeOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  effectiveStock: z.number().int(),
  published: z.boolean(),
  storeId: z.string(),
  categoryId: z.string().nullable(),
  hasDraft: z.boolean(),
  images: z.array(imageSimpleOutputSchema).optional(),
  bundleItems: z.array(bundleItemOutputSchema),
  orderItems: z.array(orderItemSimpleOutputSchema).optional(),
  priceDisplay: productPriceDisplaySchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const bundlePublicOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  effectiveStock: z.number().int(),
  published: z.boolean(),
  imageUrls: z.array(z.string()),
  childImageUrls: z.array(z.string()),
  bundleItems: z.array(bundleItemOutputSchema),
  priceDisplay: productPriceDisplaySchema,
});

export const listBundleOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  effectiveStock: z.number().int(),
  published: z.boolean(),
  storeId: z.string(),
  imageUrls: z.array(z.string()),
  bundleItemCount: z.number().int(),
  priceDisplay: productPriceDisplaySchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const listBundlesOutputSchema = z.object({
  bundles: z.array(listBundleOutputSchema),
  total: z.number().int(),
  hasMore: z.boolean(),
  page: z.number().int(),
  limit: z.number().int(),
});

export type BundleIncludeOutput = z.infer<typeof bundleIncludeOutputSchema>;
export type BundlePublicOutput = z.infer<typeof bundlePublicOutputSchema>;
export type ListBundleOutput = z.infer<typeof listBundleOutputSchema>;
export type ListBundlesOutput = z.infer<typeof listBundlesOutputSchema>;
