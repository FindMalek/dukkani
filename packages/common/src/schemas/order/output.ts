import { z } from "zod";
import { addressSimpleOutputSchema } from "../address/output";
import { customerSimpleOutputSchema } from "../customer/output";
import { orderStatusSchema, paymentMethodSchema } from "../enums";
import { orderItemWithProductOutputSchema } from "../order-item/output";
import { storeSimpleOutputSchema } from "../store/output";
import { whatsappMessageSimpleOutputSchema } from "../whatsapp-message/output";

export const orderListCustomerOutputSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export const orderListAddressOutputSchema = z.object({
  city: z.string(),
  postalCode: z.string().nullable(),
  street: z.string(),
});

export const orderListLineOutputSchema = z.object({
  price: z.number(),
  quantity: z.number().int(),
});

export const orderListItemOutputSchema = z.object({
  id: z.string(),
  status: orderStatusSchema,
  paymentMethod: paymentMethodSchema,
  createdAt: z.date(),
  customer: orderListCustomerOutputSchema.nullable().optional(),
  address: orderListAddressOutputSchema.nullable().optional(),
  orderItems: z.array(orderListLineOutputSchema),
});

export type OrderForLineTotals = {
  orderItems?: { price: number; quantity: number }[] | undefined;
};

export const orderSimpleOutputSchema = z.object({
  id: z.string(),
  status: orderStatusSchema,
  paymentMethod: paymentMethodSchema,
  isWhatsApp: z.boolean(),
  notes: z.string().nullable(),
  storeId: z.string(),
  customerId: z.string(),
  addressId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const orderIncludeOutputSchema = orderSimpleOutputSchema.extend({
  store: storeSimpleOutputSchema.optional(),
  customer: customerSimpleOutputSchema.optional(),
  address: addressSimpleOutputSchema.optional(),
  orderItems: z.array(orderItemWithProductOutputSchema).optional(),
  whatsappMessages: z.array(whatsappMessageSimpleOutputSchema).optional(),
});

export const listOrdersOutputSchema = z.object({
  orders: z.array(orderListItemOutputSchema),
  total: z.number().int(),
  hasMore: z.boolean(),
  page: z.number().int(),
  limit: z.number().int(),
});

export const orderPublicOutputSchema = orderSimpleOutputSchema.extend({
  store: storeSimpleOutputSchema.optional(),
  orderItems: z.array(orderItemWithProductOutputSchema).optional(),
  whatsappMessages: z.array(whatsappMessageSimpleOutputSchema).optional(),
});

export type OrderPublicOutput = z.infer<typeof orderPublicOutputSchema>;
export type OrderSimpleOutput = z.infer<typeof orderSimpleOutputSchema>;
export type OrderIncludeOutput = z.infer<typeof orderIncludeOutputSchema>;
export type OrderListItemOutput = z.infer<typeof orderListItemOutputSchema>;
export type ListOrdersOutput = z.infer<typeof listOrdersOutputSchema>;
