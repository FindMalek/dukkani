import { z } from "zod";
import { bundleItemInputSchema } from "../bundle-item/input";

export const createBundleInputSchema = z.object({
  storeId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  published: z.boolean().default(false),
  categoryId: z.string().min(1).optional(),
  imageUrls: z.array(z.string().url()).optional(),
  bundleItems: z
    .array(bundleItemInputSchema)
    .min(2, "Bundle requires at least 2 child products"),
});

export const updateBundleInputSchema = createBundleInputSchema
  .omit({ storeId: true })
  .partial()
  .extend({
    id: z.string().min(1),
    bundleItems: z
      .array(bundleItemInputSchema)
      .min(2, "Bundle requires at least 2 child products")
      .optional(),
  });

export const getBundleInputSchema = z.object({
  id: z.string().min(1),
});

export const listBundlesInputSchema = z
  .object({
    storeId: z.string().min(1).optional(),
    search: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
  })
  .optional();

export type CreateBundleInput = z.infer<typeof createBundleInputSchema>;
export type UpdateBundleInput = z.infer<typeof updateBundleInputSchema>;
export type GetBundleInput = z.infer<typeof getBundleInputSchema>;
export type ListBundlesInput = z.infer<typeof listBundlesInputSchema>;
