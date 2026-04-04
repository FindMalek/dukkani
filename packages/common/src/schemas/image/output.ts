import { z } from "zod";

export const imageSimpleOutputSchema = z.object({
  id: z.string(),
  url: z.string(),
  productVersionId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ImageSimpleOutput = z.infer<typeof imageSimpleOutputSchema>;
