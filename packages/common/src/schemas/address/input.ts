import { z } from "zod";
import { governorateSchema } from "../enums";

export const createAddressInputSchema = z.object({
  street: z.string().min(1, "Address line is required"),
  city: z.string().min(1, "City is required"),
  governorate: governorateSchema.optional(),
  delegation: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isDefault: z.boolean().default(false),
  customerId: z.string().min(1, "Customer ID is required"),
});

export type CreateAddressInput = z.infer<typeof createAddressInputSchema>;
