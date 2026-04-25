import { HealthStatus } from "@dukkani/common/schemas/enums";
import {
  type HealthSimpleOutput,
  healthSimpleOutputSchema,
} from "@dukkani/common/schemas/health/output";
import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { StorageService } from "@dukkani/storage";
import { enhanceLogWithTraceContext } from "@dukkani/tracing";
import { publicProcedure } from "../../procedures";

const HEALTH_CHECK_CONFIG = {
  DEGRADED_THRESHOLD_MS: 1000,
} as const;

export const healthRouter = {
  check: publicProcedure.output(healthSimpleOutputSchema).handler(async () => {
    const startTime = new Date();
    let dbConnected = false;
    let dbLatency: number | undefined;
    let storageOk = false;
    let storageLatencyMs: number | undefined;
    let health: HealthSimpleOutput | null = null;

    try {
      const dbStartTime = Date.now();
      health = await database.health.create({
        data: {
          status: HealthStatus.UNKNOWN,
          duration: 0,
          startTime,
          endTime: startTime,
          storageStatus: null,
          storageLatencyMs: null,
        },
      });
      const dbEndTime = Date.now();
      dbConnected = true;
      dbLatency = dbEndTime - dbStartTime;
    } catch (error) {
      dbConnected = false;
      logger.error(
        enhanceLogWithTraceContext({
          error: error instanceof Error ? error.message : String(error),
        }),
        "Database connection failed",
      );
    }

    try {
      const result = await StorageService.checkHealth();
      storageOk = result.ok;
      storageLatencyMs = result.latencyMs;
    } catch (error) {
      storageOk = false;
      logger.error(
        enhanceLogWithTraceContext({
          error: error instanceof Error ? error.message : String(error),
        }),
        "Storage health check failed",
      );
    }

    const status: HealthStatus =
      !dbConnected || !storageOk
        ? HealthStatus.UNHEALTHY
        : dbLatency && dbLatency > HEALTH_CHECK_CONFIG.DEGRADED_THRESHOLD_MS
          ? HealthStatus.DEGRADED
          : HealthStatus.HEALTHY;

    const endTime = new Date();

    const storageStatus = !storageOk
      ? HealthStatus.UNHEALTHY
      : storageLatencyMs &&
          storageLatencyMs > HEALTH_CHECK_CONFIG.DEGRADED_THRESHOLD_MS
        ? HealthStatus.DEGRADED
        : HealthStatus.HEALTHY;

    try {
      if (health) {
        health = await database.health.update({
          where: { id: health.id },
          data: {
            status,
            duration: dbLatency ?? 0,
            endTime,
            storageStatus,
            storageLatencyMs,
          },
        });
      } else {
        health = await database.health.create({
          data: {
            status,
            duration: 0,
            startTime,
            endTime,
            storageStatus,
            storageLatencyMs,
          },
        });
      }
    } catch (error) {
      if (health?.id) {
        health = {
          ...health,
          status,
          duration: dbLatency ?? 0,
          endTime,
          storageStatus,
          storageLatencyMs: storageLatencyMs ?? null,
        };
      }
      logger.error(
        enhanceLogWithTraceContext({
          error: error instanceof Error ? error.message : String(error),
        }),
        "Failed to persist health check result",
      );
    }

    return (
      health ?? {
        id: crypto.randomUUID(),
        status,
        duration: dbLatency ?? 0,
        startTime,
        endTime,
        storageStatus,
        storageLatencyMs: storageLatencyMs ?? null,
      }
    );
  }),
};
