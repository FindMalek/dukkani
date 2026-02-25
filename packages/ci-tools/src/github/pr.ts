import { API, fetchJSON } from "./client.js";
import type { GitHubPullRequest, PullRequestFile } from "./types.js";

export async function findOpenPR(
	token: string,
	owner: string,
	repo: string,
	headBranch: string,
): Promise<GitHubPullRequest | null> {
	const res = await fetchJSON<GitHubPullRequest[]>(
		`${API}/repos/${owner}/${repo}/pulls?head=${owner}:${headBranch}&state=open`,
		token,
	);
	return Array.isArray(res) && res.length > 0 ? (res[0] ?? null) : null;
}

export async function fetchPRFiles(
	token: string,
	owner: string,
	repo: string,
	prNumber: number,
): Promise<PullRequestFile[]> {
	return fetchJSON<PullRequestFile[]>(
		`${API}/repos/${owner}/${repo}/pulls/${prNumber}/files`,
		token,
	);
}
