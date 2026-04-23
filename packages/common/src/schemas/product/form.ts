import { ProductAddonSelectionType } from "@dukkani/db/prisma/generated/enums";
import * as z from "zod";
import {
  countVariantCombinations,
  validateVariantMatrixAgainstOptions,
} from "../../lib/variant/matrix";
import { MAX_VARIANT_COMBINATIONS } from "../constants";
import { productVariantFormRowSchema } from "../variant/form";
import { productSchema } from "./base";

export const productImageRemoteSchema = z.strictObject({
  kind: z.literal("remote"),
  url: z.url(),
});

export const productImageLocalSchema = z.strictObject({
  kind: z.literal("local"),
  file: z.file(),
  clientId: z.string().min(1, "Client ID is required"),
});

export const productImageAttachmentSchema = z.discriminatedUnion("kind", [
  productImageRemoteSchema,
  productImageLocalSchema,
]);

export type ProductImageAttachment = z.infer<
  typeof productImageAttachmentSchema
>;

export const productFormAddonOptionRowSchema = z.strictObject({
  name: z.string().min(1),
  sortOrder: z.coerce.number<string>().int().min(0).optional(),
  priceDelta: z.coerce
    .number<string>()
    .min(0, "Add-on price must be zero or positive"),
  stock: z.coerce.number<string>().int().min(0),
});

export const productFormAddonGroupRowSchema = z.strictObject({
  name: z.string().min(1),
  sortOrder: z.coerce.number<string>().int().min(0).optional(),
  selectionType: z.nativeEnum(ProductAddonSelectionType),
  required: z.boolean(),
  options: z
    .array(productFormAddonOptionRowSchema)
    .min(1, "At least one option per add-on group"),
});

export type ProductFormAddonGroupRow = z.infer<
  typeof productFormAddonGroupRowSchema
>;

export const productFormSchema = productSchema
  .omit({
    storeId: true,
  })
  .extend({
    price: z.coerce.number<string>().positive("Price must be positive"),
    stock: z.coerce.number<string>().min(0, "Stock cannot be negative"),
    images: z
      .array(productImageAttachmentSchema)
      .max(10, "Maximum 10 images allowed"),
    variants: z.array(productVariantFormRowSchema),
    addonGroups: z.array(productFormAddonGroupRowSchema).default([]),
  })
  .superRefine((data, ctx) => {
    if (!data.hasVariants) {
      if (data.variants.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Remove variant rows or turn off variants",
          path: ["variants"],
        });
      }
      return;
    }

    const comboCount = countVariantCombinations(data.variantOptions);
    if (comboCount > MAX_VARIANT_COMBINATIONS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Too many variant combinations (max ${MAX_VARIANT_COMBINATIONS}). Reduce option values.`,
        path: ["variantOptions"],
      });
      return;
    }

    const matrixResult = validateVariantMatrixAgainstOptions(
      data.variantOptions,
      data.variants,
    );
    if (!matrixResult.ok) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: matrixResult.message,
        path: ["variants"],
      });
    }
  })
  .transform(({ images, ...form }) => ({
    ...form,
    stock: form.hasVariants ? 0 : form.stock,
  }));

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormOutput = z.infer<typeof productFormSchema>;
