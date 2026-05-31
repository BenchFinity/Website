const port = process.env.LHCI_PORT ?? "3001";
const baseUrl = `http://127.0.0.1:${port}`;
const routes = [
  "/",
  "/how-it-works",
  "/use-cases",
  "/use-cases/model-railroad",
  "/open-source",
  "/blog",
  "/blog/devlog-01",
  "/faq",
  "/privacy",
  "/cookies",
];

module.exports = {
  ci: {
    collect: {
      url: routes.map((route) => new URL(route, baseUrl).toString()),
      startServerCommand: `HOSTNAME=127.0.0.1 PORT=${port} npm run start`,
      startServerReadyPattern: "Ready",
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
      },
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
