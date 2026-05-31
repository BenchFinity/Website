# Open Issues

## Launch Inputs Needed

- Real Examples/Models artifacts are still needed before `/examples` should be indexed: Printables links, MakerWorld links, YouTube videos, and subreddit posts.
- PostHog is implemented but inactive until `NEXT_PUBLIC_POSTHOG_HOST` and `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` or `NEXT_PUBLIC_POSTHOG_KEY` are provided.
- Email capture is intentionally not wired until the destination service or endpoint is chosen.
- DNS and internal Kubernetes hosting details still need to be translated into Website-CD deploy manifests.
- Tailwind Plus source access exists with the founder but has not been connected to this repo.

## Deferred Engineering Work

- Build the Website-CD Kubernetes manifests once namespace, ingress, hostnames, TLS, and deployment conventions are confirmed.
- Replace honest placeholder content on `/examples` with real public artifacts, then remove `noindex` and include the route in the sitemap.
- Add production analytics environment values and verify consent-gated capture in the deployed cluster.
- Add the email capture integration and privacy copy for the selected provider.

## Known Constraints

- The Website image is intentionally amd64-only because the site runs on the internal Kubernetes cluster.
- Local browser automation on this macOS sandbox cannot launch Chromium due Mach port restrictions, but GitHub Actions successfully runs Playwright and Lighthouse.
- `npm audit --audit-level=high` passes. A moderate transitive Next/PostCSS advisory remains without a safe current package upgrade path.
