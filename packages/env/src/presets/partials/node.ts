import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const nodeEnv = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production", "test"]),
	},
	runtimeEnvStrict: {
		NODE_ENV: process.env.NODE_ENV,
	},
});
