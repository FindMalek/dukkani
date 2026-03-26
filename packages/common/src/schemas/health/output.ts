import { z } from "zod";
import { healthStatusSchema } from "./enums";

export const healthSimpleOutputSchema = z.object({
  id: z.string(),
  status: healthStatusSchema,
  duration: z.number().int(),
  startTime: z.date(),
  endTime: z.date(),
  storageStatus: healthStatusSchema.nullable(),
  storageLatencyMs: z.number().int().nullable(),
});

export type HealthSimpleOutput = z.infer<typeof healthSimpleOutputSchema>;
