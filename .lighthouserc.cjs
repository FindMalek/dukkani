/** @type {import('@lhci/cli').Config} */
const previewBaseUrl = process.env.LIGHTHOUSE_URL;

if (!previewBaseUrl) {
  throw new Error(
    "LIGHTHOUSE_URL environment variable must be set for Lighthouse CI.",
  );
}

const previewPaths = process.env.LIGHTHOUSE_PATHS
  ? process.env.LIGHTHOUSE_PATHS.split(",")
      .map((path) => path.trim())
      .filter(Boolean)
  : [];

const collectUrls =
  previewPaths.length > 0
    ? previewPaths.map((path) => `${previewBaseUrl}${path}`)
    : [previewBaseUrl];

const config = {
  ci: {
    collect: {
      url: collectUrls,
      numberOfRuns: 3,
      settings: {
        preset: process.env.LHCI_PRESET || "desktop",
        ...(process.env.LHCI_SCREEN_EMULATION && {
          screenEmulation: JSON.parse(process.env.LHCI_SCREEN_EMULATION),
        }),
        ...(process.env.LHCI_SCREEN_EMULATION && 
          JSON.parse(process.env.LHCI_SCREEN_EMULATION).formFactor && {
          formFactor: JSON.parse(process.env.LHCI_SCREEN_EMULATION).formFactor,
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
