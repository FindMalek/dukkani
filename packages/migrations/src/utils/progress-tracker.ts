import { logger } from "@dukkani/logger";
import type { MigrationProgress } from "../types";

/**
 * Progress tracking utility for migrations
 */
export class ProgressTracker {
	private progress: MigrationProgress;
	private startTime: number;

	constructor(progress: MigrationProgress) {
		this.progress = progress;
		this.startTime = Date.now();
	}

	/**
	 * Update progress
	 */
	update(increment: number, error?: Error): void {
		this.progress.processed += increment;
		if (error) {
			this.progress.failed += increment;
			this.progress.errors.push({
				timestamp: new Date(),
				message: error.message,
				stack: error.stack,
			});
		}
	}

	/**
	 * Get current progress percentage
	 */
	getPercentage(): number {
		if (this.progress.total === 0) return 0;
		return Math.round((this.progress.processed / this.progress.total) * 100);
	}

	/**
	 * Get estimated time remaining
	 */
	getEstimatedTimeRemaining(): number {
		if (this.progress.processed === 0) return 0;

		const elapsed = Date.now() - this.startTime;
		const rate = this.progress.processed / elapsed;
		const remaining = this.progress.total - this.progress.processed;

		return Math.round(remaining / rate);
	}

	/**
	 * Log current progress
	 */
	log(context?: string): void {
		const percentage = this.getPercentage();
		const eta = this.getEstimatedTimeRemaining();

		logger.info(
			{
				progress: this.progress,
				percentage,
				eta: eta > 0 ? `${Math.round(eta / 1000)}s` : "N/A",
				context,
			},
			`Migration progress: ${percentage}% (${this.progress.processed}/${this.progress.total})`,
		);
	}

	/**
	 * Check if migration is complete
	 */
	isComplete(): boolean {
		return this.progress.processed >= this.progress.total;
	}

	/**
	 * Check if migration has errors
	 */
	hasErrors(): boolean {
		return this.progress.errors.length > 0;
	}

	/**
	 * Get error summary
	 */
	getErrorSummary(): string {
		if (this.progress.errors.length === 0) return "No errors";

		const recentErrors = this.progress.errors.slice(-5);
		return recentErrors.map((err) => err.message).join("; ");
	}

	/**
	 * Cleanup resources
	 */
	async cleanup(): Promise<void> {
		// No specific cleanup needed for now
	}
}
