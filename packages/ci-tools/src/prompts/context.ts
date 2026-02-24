export const WORKFLOW_CONTEXT: Record<string, string> = {
	"Lighthouse CI":
		"Next.js, .lighthouserc thresholds, performance/accessibility; env vars often cause failures.",
	"Prisma Migrate Deploy":
		"packages/db, schema, migrations; DATABASE_URL, migration conflicts.",
	"Languine Translation": "packages/common/src/locale, API key, project ID.",
};
