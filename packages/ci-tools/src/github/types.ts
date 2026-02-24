export interface GitHubJob {
	id: number;
	name: string;
	conclusion: string | null;
	status: string;
}

export interface GitHubJobsResponse {
	jobs: GitHubJob[];
}

export interface PullRequestFile {
	filename: string;
	patch?: string;
	changes?: number;
}

export interface GitHubComment {
	id: number;
	body: string | null;
}

export interface GitHubPullRequest {
	number: number;
}

interface FetchOptions extends RequestInit {
	headers?: Record<string, string>;
}

export type { FetchOptions };
