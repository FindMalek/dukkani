import { z } from "zod";
import { validateVariantMatrixAgainstOptions } from "../../utils/variant-matrix";
import { productAddonGroupInputSchema } from "../product-addon/input";
import { variantInputSchema, variantOptionInputSchema } from "../variant/input";

export const productVersionIdSchema = z
  .string()
  .min(1, "Version ID is required");

/**
 * Merchandising-only update for a draft product version (keyed by `versionId`).
 * Excludes product-shell fields (`categoryId`, `published`, `collectionIds`, …).
 */
export const updateProductVersionInputSchema = z
  .object({
    versionId: productVersionIdSchema,
    name: z.string().min(1, "Product name is required").optional(),
    description: z.string().optional().nullable(),
    price: z.number().positive("Price must be positive").optional(),
    stock: z.number().int().min(0, "Stock cannot be negative").optional(),
    hasVariants: z.boolean().optional(),
    imageUrls: z.array(z.url()).optional(),
    variantOptions: z.array(variantOptionInputSchema).optional(),
    variants: z.array(variantInputSchema).optional(),
    addonGroups: z.array(productAddonGroupInputSchema).optional(),
  })
  .refine(
    (data) => {
      const keys = Object.keys(data).filter((k) => k !== "versionId");
      return keys.length > 0;
    },
    {
      message: "At least one field to update is required",
      path: ["versionId"],
    },
  )
  .superRefine((data, ctx) => {
    if (data.variantOptions === undefined || data.variantOptions.length === 0) {
      return;
    }
    if (!data.variants?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Variants matrix is required when non-empty variant options are sent",
        path: ["variants"],
      });
      return;
    }
    const result = validateVariantMatrixAgainstOptions(
      data.variantOptions,
      data.variants,
    );
    if (!result.ok) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.message,
        path: ["variants"],
      });
    }
  })
  .refine(
    (data) => {
      if (!data.variants?.length) return true;
      const skus = data.variants
        .map((v) => v.sku?.trim())
        .filter((sku): sku is string => !!sku);
      return new Set(skus).size === skus.length;
    },
    {
      message: "Duplicate SKUs are not allowed within the same product",
      path: ["variants"],
    },
  )
  .superRefine((data, ctx) => {
    if (data.variantOptions === undefined) return;
    const optionNames = data.variantOptions
      .map((opt) => opt.name.toLowerCase().trim())
      .filter((name) => name.length > 0);
    if (new Set(optionNames).size !== optionNames.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Duplicate option names are not allowed",
        path: ["variantOptions"],
      });
    }
  });

export type UpdateProductVersionInput = z.infer<
  typeof updateProductVersionInputSchema
>;

export type UpdateProductVersionMerchandisingInput = Omit<
  UpdateProductVersionInput,
  "versionId"
>;
