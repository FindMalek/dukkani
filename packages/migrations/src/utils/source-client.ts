import { logger } from "@dukkani/logger";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { StorageMigrationConfig } from "../types";

/**
 * Source storage client wrapper for Supabase
 */
export class SourceStorageClient {
  private client: SupabaseClient | null = null;
  private config: StorageMigrationConfig["source"];

  constructor(config: StorageMigrationConfig["source"]) {
    this.config = config;
  }

  /**
   * Get Supabase client
   */
  private getClient(): SupabaseClient {
    if (!this.client) {
      if (!this.config.supabaseUrl || !this.config.supabaseServiceKey) {
        throw new Error("Supabase URL and service key are required");
      }

      this.client = createClient(
        this.config.supabaseUrl,
        this.config.supabaseServiceKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        },
      );
    }
    return this.client;
  }

  /**
   * Validate connection to source storage
   */
  async validateConnection(): Promise<void> {
    try {
      const client = this.getClient();
      const bucket = this.config.supabaseBucket || "production";

      // Test connection by listing bucket contents
      await client.storage.from(bucket).list("", { limit: 1 });

      logger.info("Source storage connection validated");
    } catch (error) {
      const bucket = this.config.supabaseBucket || "production";
      throw new Error(
        `Source storage connection failed for bucket '${bucket}': ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * List all files in bucket recursively
   */
  async listAllFiles(bucket?: string, folder = ""): Promise<string[]> {
    const client = this.getClient();
    const bucketName = bucket || this.config.supabaseBucket || "production";

    const { data, error } = await client.storage.from(bucketName).list(folder, {
      limit: 1000,
    });

    if (error) {
      throw new Error(
        `Failed to list files in ${folder || "root"}: ${error.message}`,
      );
    }

    const paths: string[] = [];

    for (const item of data ?? []) {
      const fullPath = folder ? `${folder}/${item.name}` : item.name;

      if (item.id == null) {
        // Folder - recurse
        paths.push(...(await this.listAllFiles(bucketName, fullPath)));
      } else {
        // File
        paths.push(fullPath);
      }
    }

    return paths;
  }

  /**
   * Download a file
   */
  async downloadFile(bucket: string, path: string): Promise<Blob> {
    const client = this.getClient();

    const { data, error } = await client.storage.from(bucket).download(path);

    if (error) {
      throw new Error(`Failed to download file ${path}: ${error.message}`);
    }

    return data;
  }

  /**
   * Delete a file
   */
  async deleteFile(bucket: string, path: string): Promise<void> {
    const client = this.getClient();

    const { error } = await client.storage.from(bucket).remove([path]);

    if (error) {
      throw new Error(`Failed to delete file ${path}: ${error.message}`);
    }
  }

  /**
   * Delete multiple files
   */
  async deleteFiles(bucket: string, paths: string[]): Promise<void> {
    if (paths.length === 0) return;

    const client = this.getClient();

    const { error } = await client.storage.from(bucket).remove(paths);

    if (error) {
      throw new Error(`Failed to delete files: ${error.message}`);
    }
  }

  /**
   * Get public URL for a file
   */
  getPublicUrl(bucket: string, path: string): string {
    const client = this.getClient();

    const { data } = client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * Cleanup client
   */
  async cleanup(): Promise<void> {
    this.client = null;
  }
}
