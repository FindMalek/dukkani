import { z } from "zod";
import { categoryOutputSchema } from "../category/output";
import { imageSimpleOutputSchema } from "../image/output";
import { orderItemSimpleOutputSchema } from "../order-item/output";
import { productAddonGroupPublicSchema } from "../product-addon/output";
import { userSimpleSelectOutputSchema } from "../user/output";
import {
  variantOptionOutputSchema,
  variantOutputSchema,
} from "../variant/output";

export const productPriceDisplaySchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("simple"), price: z.number() }),
  z.object({
    kind: z.literal("range"),
    min: z.number(),
    max: z.number(),
  }),
]);

export type ProductPriceDisplay = z.infer<typeof productPriceDisplaySchema>;

export const productSimpleOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  stock: z.number().int(),
  published: z.boolean(),
  storeId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const listProductOutputSchema = productSimpleOutputSchema.extend({
  imageUrls: z.array(z.string()),
  variantCount: z.number().int(),
  priceDisplay: productPriceDisplaySchema,
});

export const productIncludeOutputSchema = productSimpleOutputSchema.extend({
  categoryId: z.string().nullable(),
  hasDraft: z.boolean(),
  hasVariants: z.boolean(),
  images: z.array(imageSimpleOutputSchema).optional(),
  orderItems: z.array(orderItemSimpleOutputSchema).optional(),
  variantOptions: z.array(variantOptionOutputSchema).optional(),
  variants: z.array(variantOutputSchema).optional(),
  addonGroups: z.array(productAddonGroupPublicSchema).optional(),
});

export const listProductsOutputSchema = z.object({
  products: z.array(listProductOutputSchema),
  total: z.number().int(),
  hasMore: z.boolean(),
  page: z.number().int(),
  limit: z.number().int(),
});

export const productPublicStoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  owner: userSimpleSelectOutputSchema.optional(),
});

export const productPublicOutputSchema = productSimpleOutputSchema
  .extend({
    imageUrls: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    store: productPublicStoreSchema.optional(),
    variants: z.array(variantOutputSchema).optional(),
    variantOptions: z.array(variantOptionOutputSchema).optional(),
    addonGroups: z.array(productAddonGroupPublicSchema).optional(),
    priceDisplay: productPriceDisplaySchema,
  })
  .omit({
    storeId: true,
    createdAt: true,
    updatedAt: true,
  });

export const productOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  stock: z.number(),
  published: z.boolean(),
  categoryId: z.string().nullable(),
  hasVariants: z.boolean(),
  storeId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  category: categoryOutputSchema.nullable().optional(),
  variantOptions: z.array(variantOptionOutputSchema).optional(),
  variants: z.array(variantOutputSchema).optional(),
});

export type ProductPublicOutput = z.infer<typeof productPublicOutputSchema>;
export type ProductSimpleOutput = z.infer<typeof productSimpleOutputSchema>;
export type ListProductOutput = z.infer<typeof listProductOutputSchema>;
export type ProductIncludeOutput = z.infer<typeof productIncludeOutputSchema>;
export type ListProductsOutput = z.infer<typeof listProductsOutputSchema>;
export type ProductOutput = z.infer<typeof productOutputSchema>;

export const productsPublicOutputSchema = z.array(productPublicOutputSchema);
export type ProductsPublicOutput = z.infer<typeof productsPublicOutputSchema>;
