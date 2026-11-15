import { z } from "zod";

export const kapsoStatusInputSchema = z.object({
  storeId: z.string().min(1, "Store ID is required"),
});

export const connectKapsoInputSchema = z.object({
  storeId: z.string().min(1, "Store ID is required"),
  phoneNumberId: z
    .string()
    .min(1, "WhatsApp Business Phone Number ID is required"),
  notificationNumber: z
    .string()
    .min(8, "Enter a valid WhatsApp number")
    .regex(/^\+?[1-9]\d{6,14}$/, "Enter a valid phone number (E.164 format)"),
});

export const disconnectKapsoInputSchema = z.object({
  storeId: z.string().min(1, "Store ID is required"),
});

export const sendKapsoTestMessageInputSchema = z.object({
  storeId: z.string().min(1, "Store ID is required"),
});

export type KapsoStatusInput = z.infer<typeof kapsoStatusInputSchema>;
export type ConnectKapsoInput = z.infer<typeof connectKapsoInputSchema>;
export type DisconnectKapsoInput = z.infer<typeof disconnectKapsoInputSchema>;
export type SendKapsoTestMessageInput = z.infer<
  typeof sendKapsoTestMessageInputSchema
>;
