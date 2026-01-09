import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const dbEnv = createEnv({
  server: {
    DATABASE_URL: z.url({ error: "DATABASE_URL must be a valid URL" }),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  }
});
