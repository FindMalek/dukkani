import * as z from "zod";
import { productSchema } from "./base";

export const productFormSchema = productSchema
  .omit({
    storeId: true,
  })
  .extend({
    price: z.coerce.number<string>().positive("Price must be positive"),
    stock: z.coerce.number<string>().min(0, "Stock cannot be negative"),
    imageFiles: z.array(z.file()).max(10, "Maximum 10 images allowed"),
    existingImageUrls: z.array(z.url()).max(10).default([]),
  })
  .superRefine((data, ctx) => {
    if (data.imageFiles.length + data.existingImageUrls.length > 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Maximum 10 images allowed",
        path: ["imageFiles"],
      });
    }
  })
  .transform(({ imageFiles, ...form }) => form);

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormOutput = z.infer<typeof productFormSchema>;
