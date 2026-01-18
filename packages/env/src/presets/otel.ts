import { z } from "zod";

export const otelServerSchema = {
	OTEL_SERVICE_NAME: z.string(),
	OTEL_SAMPLING_RATE: z.coerce.number().min(0).max(1),
	OTEL_ENABLED: z.coerce.boolean(),
	OTEL_EXPORTER_OTLP_ENDPOINT: z.url().optional(),
	OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: z.url().optional(),
	OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: z.url().optional(),
	OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: z.url().optional(),
	OTEL_EXPORTER_OTLP_HEADERS: z.string().optional(),
	OTEL_EXPORTER_OTLP_PROTOCOL: z.enum(["http/protobuf"]).optional(),
	OTEL_EXPORTER_OTLP_COMPRESSION: z.enum(["gzip"]).optional(),
};
