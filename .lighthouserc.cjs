/** @type {import('@lhci/cli').Config} */
const config = {
	ci: {
		collect: {
			startServerCommand:
				"pnpm turbo run db:generate --filter=@dukkani/db && pnpm turbo build --filter=@dukkani/web && cd apps/web && (PORT=3000 pnpm start &) && npx wait-on http://localhost:3000/en -t 60000 && echo LHCI_READY && wait",
			startServerReadyPattern: "LHCI_READY",
			startServerReadyTimeout: 180000,
			url: ["http://localhost:3000/en", "http://localhost:3000/ar"],
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
				"categories:accessibility": ["error", { minScore: 0.9 }],
				"categories:best-practices": ["warn", { minScore: 0.8 }],
			},
		},
		upload: {
			target: "temporary-public-storage",
		},
	},
};

module.exports = config;