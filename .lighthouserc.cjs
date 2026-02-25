/** @type {import('@lhci/cli').Config} */
const config = {
	ci: {
		collect: {
			startServerCommand:
				"pnpm turbo run db:generate --filter=@dukkani/db && pnpm turbo run db:push --filter=@dukkani/db && pnpm turbo run db:seed --filter=@dukkani/db && pnpm turbo build --filter=@dukkani/web && pnpm turbo build --filter=@dukkani/storefront && (cd apps/web && PORT=3000 pnpm start &) && (cd apps/storefront && PORT=3004 pnpm start &) && npx wait-on http://localhost:3000/en http://omar-home.localhost:3004/en -t 60000 && echo LHCI_READY && wait",
			startServerReadyPattern: "LHCI_READY",
			startServerReadyTimeout: 90000,
			url: [
				"http://localhost:3000/en",
				"http://localhost:3000/ar",
				"http://omar-home.localhost:3004/en",
				"http://omar-home.localhost:3004/ar",
			],
			numberOfRuns: 3,
			settings: {
				preset: process.env.LHCI_PRESET || "desktop",
				...(process.env.LHCI_SCREEN_EMULATION && {
					screenEmulation: JSON.parse(process.env.LHCI_SCREEN_EMULATION),
				}),
			},
		},
		assert: {
			assertions: {
				"categories:performance": ["error", { minScore: 0.85 }],
				"categories:accessibility": ["error", { minScore: 0.85 }],
				"categories:best-practices": ["warn", { minScore: 0.8 }],
			},
		},
		upload: {
			target: "temporary-public-storage",
		},
	},
};

module.exports = config;
