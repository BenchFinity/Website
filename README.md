# Benchfinity Website

Next.js marketing and content site for Benchfinity.

## Local Development

```bash
npm ci
npm run dev
```

The production build uses Next standalone output:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` into your local environment and fill in only real public
values. PostHog stays consent-gated and does not load unless both the project
token and host are configured.

## Container Images

CI publishes amd64 images to GitHub Container Registry at
`ghcr.io/benchfinity/website` for the internal Kubernetes cluster.

```bash
docker build -t benchfinity-website .
docker run --rm -p 3000:3000 benchfinity-website
```

Published tags follow the Workbench convention:

- `feature/*` branches publish snapshot images with sanitized branch name and
  short commit SHA.
- `develop` publishes a snapshot image plus the rolling `develop` tag.
- `release/*` and `rc/*` branches publish RC images and prerelease GitHub
  Releases.
- `main` publishes the clean package version tag and a stable GitHub Release.
