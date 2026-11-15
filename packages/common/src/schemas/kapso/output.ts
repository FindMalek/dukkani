import { z } from "zod";

export const kapsoStatusOutputSchema = z.object({
  connected: z.boolean(),
  connectedAt: z.date().nullable(),
  phoneNumberId: z.string().nullable(),
  notificationNumber: z.string().nullable(),
});

export type KapsoStatusOutput = z.infer<typeof kapsoStatusOutputSchema>;
