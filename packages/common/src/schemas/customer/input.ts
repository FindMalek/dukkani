import { z } from "zod";
import { governorateSchema } from "../enums";

export const customerInputSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  phone: z.string().min(1, "Customer phone is required"),
  storeId: z.string().min(1, "Store ID is required"),
});

export const createCustomerInputSchema = customerInputSchema;

export const updateCustomerInputSchema = customerInputSchema.partial().extend({
  id: z.string().min(1, "Customer ID is required"),
});

export const getCustomerInputSchema = z.object({
  id: z.string().min(1, "Customer ID is required"),
});

export const listCustomersInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  storeId: z.string().optional(),
  phone: z.string().optional(),
});

export const CUSTOMER_SORT_OPTIONS = [
  "recent",
  "orderCount",
  "totalSpent",
  "lastOrderAt",
] as const;
export const customerSortSchema = z.enum(CUSTOMER_SORT_OPTIONS);
export type CustomerSort = z.infer<typeof customerSortSchema>;

export const listCustomersWithStatsInputSchema =
  listCustomersInputSchema.extend({
    governorates: z.array(governorateSchema).optional(),
    sortBy: customerSortSchema.default("recent"),
  });

export const getGovernorateCountsInputSchema = z.object({
  storeId: z.string().optional(),
});

export const updateCustomerNotesInputSchema = z.object({
  id: z.string().min(1, "Customer ID is required"),
  notes: z.string().max(2000).nullable(),
});

export type CustomerInput = z.infer<typeof customerInputSchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerInputSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerInputSchema>;
export type GetCustomerInput = z.infer<typeof getCustomerInputSchema>;
export type ListCustomersInput = z.infer<typeof listCustomersInputSchema>;
export type ListCustomersWithStatsInput = z.infer<
  typeof listCustomersWithStatsInputSchema
>;
export type GetGovernorateCountsInput = z.infer<
  typeof getGovernorateCountsInputSchema
>;
export type UpdateCustomerNotesInput = z.infer<
  typeof updateCustomerNotesInputSchema
>;
