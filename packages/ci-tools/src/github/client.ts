import type { FetchOptions } from "./types.js";

const API = "https://api.github.com";

export { API };

export async function fetchJSON<T>(
	url: string,
	token: string,
	opts: FetchOptions = {},
): Promise<T> {
	const res = await fetch(url, {
		...opts,
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
			...opts.headers,
		},
	});
	if (!res.ok) {
		const t = await res.text();
		throw new Error(`GitHub API ${res.status}: ${t.slice(0, 200)}`);
	}
	return res.json() as Promise<T>;
}
