import { ProductType } from "@dukkani/db/prisma/generated/enums";
import { z } from "zod";

export const generateDescriptionVariantOptionSchema = z.object({
  name: z.string().min(1),
  values: z.array(z.string().min(1)).min(1),
});

export const generateDescriptionBundleItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().int().positive(),
});

const generateProductDescriptionSharedSchema = z.object({
  storeId: z.string().min(1, "Store ID is required"),
  title: z.string().trim().min(1, "Title is required").max(200),
  categoryName: z.string().trim().max(120).optional(),
  price: z.number().positive().optional(),
  currency: z.string().trim().length(3).optional(),
  merchantNotes: z.string().trim().max(1000).optional(),
  productType: z.nativeEnum(ProductType).default(ProductType.SIMPLE),
  hasVariants: z.boolean().default(false),
  variantOptions: z
    .array(generateDescriptionVariantOptionSchema)
    .max(10)
    .default([]),
  isBundle: z.boolean().default(false),
  bundleItems: z.array(generateDescriptionBundleItemSchema).max(50).default([]),
});

/** oRPC wire contract: client sends raw files, same as `productUploadImagesInputSchema`. */
export const generateProductDescriptionProcedureInputSchema =
  generateProductDescriptionSharedSchema.extend({
    images: z
      .array(z.file())
      .max(3, "Maximum 3 images per generation")
      .default([]),
  });

/** Service-level contract: router resizes files into base64 JPEG before calling the service. */
export const generateProductDescriptionInputSchema =
  generateProductDescriptionSharedSchema.extend({
    images: z
      .array(
        z.object({
          base64: z.string().min(1),
          mimeType: z.literal("image/jpeg"),
        }),
      )
      .max(3, "Maximum 3 images per generation")
      .default([]),
  });

export const generateProductDescriptionOutputSchema = z.object({
  description: z.string().min(1),
});

export type GenerateDescriptionVariantOption = z.infer<
  typeof generateDescriptionVariantOptionSchema
>;
export type GenerateDescriptionBundleItem = z.infer<
  typeof generateDescriptionBundleItemSchema
>;
export type GenerateProductDescriptionProcedureInput = z.infer<
  typeof generateProductDescriptionProcedureInputSchema
>;
export type GenerateProductDescriptionInput = z.infer<
  typeof generateProductDescriptionInputSchema
>;
export type GenerateProductDescriptionOutput = z.infer<
  typeof generateProductDescriptionOutputSchema
>;
