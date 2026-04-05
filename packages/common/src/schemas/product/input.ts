import { z } from "zod";
import { validateVariantMatrixAgainstOptions } from "../../utils/variant-matrix";
import {
  type VariantInput,
  type VariantOptionInput,
  variantInputSchema,
  variantOptionInputSchema,
} from "../variant/input";

/**
 * Product line item - productId, variantId, quantity.
 * Shared across cart, orders, stock checks, price lookups.
 */
export const productLineItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export type ProductLineItem = z.infer<typeof productLineItemSchema>;

export const productInputSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  published: z.boolean(),
  storeId: z.string().min(1, "Store ID is required"),
  categoryId: z.string().optional(),
  hasVariants: z.boolean(),
});

export const createProductInputSchema = productInputSchema
  .extend({
    imageUrls: z.array(z.url()).optional(),
    variantOptions: z.array(variantOptionInputSchema).optional(),
    variants: z.array(variantInputSchema).optional(),
    collectionIds: z
      .array(z.string().min(1, "Collection ID cannot be empty"))
      .optional()
      .refine(
        (arr) => {
          if (!arr || arr.length === 0) return true;
          return new Set(arr).size === arr.length;
        },
        {
          message: "Collection IDs must be unique",
        },
      ),
  })
  .refine(
    (data) => {
      if (!data.hasVariants) {
        return (
          (!data.variantOptions || data.variantOptions.length === 0) &&
          (!data.variants || data.variants.length === 0)
        );
      }
      return true;
    },
    {
      message: "Variants should not be provided when hasVariants is false",
      path: ["hasVariants"],
    },
  )
  .refine(
    (data) => {
      if (data.hasVariants) {
        if (!data.variantOptions || data.variantOptions.length === 0) {
          return false;
        }
        const optionNames = data.variantOptions
          .map((opt) => opt.name.toLowerCase().trim())
          .filter((name) => name.length > 0);
        return new Set(optionNames).size === optionNames.length;
      }
      return true;
    },
    {
      message: "Duplicate option names are not allowed",
      path: ["variantOptions"],
    },
  )
  .refine(
    (data) => {
      if (data.hasVariants && data.variants) {
        const skus = data.variants
          .map((v) => v.sku?.trim())
          .filter((sku): sku is string => !!sku);
        return new Set(skus).size === skus.length;
      }
      return true;
    },
    {
      message: "Duplicate SKUs are not allowed within the same product",
      path: ["variants"],
    },
  )
  .superRefine((data, ctx) => {
    if (!data.hasVariants) return;
    const result = validateVariantMatrixAgainstOptions(
      data.variantOptions ?? [],
      data.variants ?? [],
    );
    if (!result.ok) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.message,
        path: ["variants"],
      });
    }
  });

export const updateProductInputSchema = productInputSchema
  .partial()
  .extend({
    id: z.string().min(1, "Product ID is required"),
    imageUrls: z.array(z.url()).optional(),
    variantOptions: z.array(variantOptionInputSchema).optional(),
    variants: z.array(variantInputSchema).optional(),
    collectionIds: z
      .array(z.string().min(1, "Collection ID cannot be empty"))
      .optional()
      .refine(
        (arr) => {
          if (!arr || arr.length === 0) return true;
          return new Set(arr).size === arr.length;
        },
        {
          message: "Collection IDs must be unique",
        },
      ),
  })
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
  );

export const getProductInputSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
});

export const stockFilterSchema = z
  .enum(["all", "in-stock", "low-stock", "out-of-stock"])
  .optional();

export const variantsFilterSchema = z
  .enum(["all", "with-variants", "single-sku"])
  .optional();

export const listProductsInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  storeId: z.string().optional(),
  published: z.boolean().optional(),
  categoryId: z.string().optional(),
  stockFilter: stockFilterSchema,
  variantsFilter: variantsFilterSchema,
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
});

export const togglePublishProductInputSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  published: z.boolean(),
});

export const publishProductInputSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  expectedDraftUpdatedAt: z.coerce.date().optional(),
});

export const discardDraftProductInputSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
});

export type ProductInput = z.infer<typeof productInputSchema>;
export type CreateProductInput = z.infer<typeof createProductInputSchema>;

export type CreateInitialPublishedVersionInput = Pick<
  CreateProductInput,
  "name" | "price" | "stock" | "hasVariants"
> & {
  description?: string | null;
  imageUrls?: string[];
  variantOptions?: VariantOptionInput[];
  variants?: VariantInput[];
};

export type UpdateProductInput = z.infer<typeof updateProductInputSchema>;
export type GetProductInput = z.infer<typeof getProductInputSchema>;
export type ListProductsInput = z.infer<typeof listProductsInputSchema>;
export type StockFilter = z.infer<typeof stockFilterSchema>;
export type VariantsFilter = z.infer<typeof variantsFilterSchema>;
export type TogglePublishProductInput = z.infer<
  typeof togglePublishProductInputSchema
>;
export type PublishProductInput = z.infer<typeof publishProductInputSchema>;
export type DiscardDraftProductInput = z.infer<
  typeof discardDraftProductInputSchema
>;

export const getProductsByIdsInputSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(50),
});

export type GetProductsByIdsInput = z.infer<typeof getProductsByIdsInputSchema>;

export const productUploadImagesInputSchema = z.object({
  storeId: z.string().min(1, "Store ID is required"),
  files: z
    .array(z.file())
    .min(1, "At least one file is required")
    .max(10, "Maximum 10 files allowed"),
});

export type ProductUploadImagesInput = z.infer<
  typeof productUploadImagesInputSchema
>;
