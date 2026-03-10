import { fetchJSON } from "./client.js";
import type { GitHubComment } from "./types.js";

const API = "https://api.github.com";

export async function listComments(
	token: string,
	owner: string,
	repo: string,
	issueNumber: number,
): Promise<GitHubComment[]> {
	const res = await fetchJSON<GitHubComment[]>(
		`${API}/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
		token,
	);
	return Array.isArray(res) ? res : [];
}

export async function createComment(
	token: string,
	owner: string,
	repo: string,
	issueNumber: number,
	body: string,
): Promise<void> {
	const res = await fetch(
		`${API}/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ body }),
		},
	);
	if (!res.ok) throw new Error(`Create comment failed: ${res.status}`);
}

export async function updateComment(
	token: string,
	owner: string,
	repo: string,
	commentId: number,
	body: string,
): Promise<void> {
	const res = await fetch(
		`${API}/repos/${owner}/${repo}/issues/comments/${commentId}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ body }),
		},
	);
	if (!res.ok) throw new Error(`Update comment failed: ${res.status}`);
}
