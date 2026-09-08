import { z } from "zod";
import { governorateSchema } from "../enums";

export const addressSimpleOutputSchema = z.object({
  id: z.string(),
  street: z.string(),
  city: z.string(),
  governorate: governorateSchema.nullable(),
  delegation: z.string().nullable(),
  postalCode: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  isDefault: z.boolean(),
  customerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AddressSimpleOutput = z.infer<typeof addressSimpleOutputSchema>;
