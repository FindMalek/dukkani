import { z } from "zod";
import { governorateSchema, orderStatusSchema } from "../enums";
import { storeSimpleOutputSchema } from "../store/output";

export const customerSimpleOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  prefersWhatsApp: z.boolean(),
  storeId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const customerAddressWithOrderCountOutputSchema = z.object({
  id: z.string(),
  street: z.string(),
  city: z.string(),
  governorate: governorateSchema.nullable(),
  isDefault: z.boolean(),
  orderCount: z.number().int(),
});

export const customerOrderSummaryOutputSchema = z.object({
  id: z.string(),
  status: orderStatusSchema,
  createdAt: z.date(),
  total: z.number(),
});

export const customerIncludeOutputSchema = customerSimpleOutputSchema.extend({
  store: storeSimpleOutputSchema.optional(),
  notes: z.string().nullable(),
  addresses: z.array(customerAddressWithOrderCountOutputSchema),
  orders: z.array(customerOrderSummaryOutputSchema),
  orderCount: z.number().int(),
  totalSpent: z.number(),
  avgOrderValue: z.number(),
  lastOrderAt: z.date().nullable(),
});

export const listCustomersOutputSchema = z.object({
  customers: z.array(customerSimpleOutputSchema),
  total: z.number().int(),
  hasMore: z.boolean(),
  page: z.number().int(),
  limit: z.number().int(),
});

export const customerListItemOutputSchema = customerSimpleOutputSchema.extend({
  governorates: z.array(governorateSchema),
  orderCount: z.number().int(),
  totalSpent: z.number(),
  lastOrderAt: z.date().nullable(),
});

export const listCustomersWithStatsOutputSchema = z.object({
  customers: z.array(customerListItemOutputSchema),
  total: z.number().int(),
  hasMore: z.boolean(),
  page: z.number().int(),
  limit: z.number().int(),
});

export const governorateCountsOutputSchema = z.object({
  counts: z.array(
    z.object({ governorate: governorateSchema, count: z.number().int() }),
  ),
});

export type CustomerSimpleOutput = z.infer<typeof customerSimpleOutputSchema>;
export type CustomerIncludeOutput = z.infer<typeof customerIncludeOutputSchema>;
export type ListCustomersOutput = z.infer<typeof listCustomersOutputSchema>;
export type CustomerListItemOutput = z.infer<
  typeof customerListItemOutputSchema
>;
export type ListCustomersWithStatsOutput = z.infer<
  typeof listCustomersWithStatsOutputSchema
>;
export type GovernorateCountsOutput = z.infer<
  typeof governorateCountsOutputSchema
>;
