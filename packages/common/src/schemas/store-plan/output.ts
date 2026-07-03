import { z } from "zod";
import { storePlanTypeSchema } from "./enums";

export const storePlanSimpleOutputSchema = z.object({
  id: z.string(),
  planType: storePlanTypeSchema,
  orderLimit: z.number().int(),
  orderCount: z.number().int(),
  resetAt: z.coerce.date().nullable(),
  storeId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type StorePlanSimpleOutput = z.infer<typeof storePlanSimpleOutputSchema>;
