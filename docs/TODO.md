# TODO

## Current

- [x] Confirm `../Company` is the source repo for prompt paths.
- [x] Create local `develop` branch and feature branch.
- [x] Push `develop` and set GitHub default branch to `develop`.
- [x] Verify `BenchFinity/Website-CD` exists.
- [x] Clone `BenchFinity/Website-CD` to `../Website-CD`.
- [x] Push `develop` and set GitHub default branch to `develop` for `Website-CD`.
- [x] Read website spec, handoff, brand, marketing, legal, community, and design sources.
- [x] Get approval for the phase plan.

## P0: Scaffold

- [x] Verify current Next.js, Tailwind, MDX, Playwright, and Lighthouse APIs against official docs.
- [x] Scaffold Next.js app in this repo without replacing user changes.
- [x] Configure Node 22, npm scripts, TypeScript strict, ESLint, Prettier, Tailwind plugin.
- [x] Configure Tailwind v4 and standalone output.
- [x] Add MDX, sitemap, robots, Playwright, and Lighthouse baseline.
- [x] Add Workbench-style GitHub Actions CI, image scan, GHCR publish, and release scaffold.
- [x] Run install, format check, lint, typecheck, build, and local HTTP smoke tests.
- [ ] Run Playwright browser tests outside the current macOS sandbox.

## V1 Site Surface

- [x] Home.
- [x] How it works.
- [x] Use Cases index.
- [x] Use Case: Model railroad and HO rolling stock.
- [x] Use Case: Toolbox and tool-chest buildout.
- [x] Use Case: Tool tracing and fitted trays.
- [x] Open Source.
- [x] Blog index.
- [x] Seeded Blog posts.
- [x] Examples and Models.
- [x] FAQ.
- [x] Privacy.
- [x] Cookie Policy.
- [x] Consent banner and footer settings control.
- [x] Sitemap and robots include the full route set.
- [x] HTTP smoke checks cover the full route set.
- [ ] Replace placeholder Examples/Models slots with real Printables, MakerWorld, YouTube, and subreddit links after those artifacts exist.
- [x] Add consent-gated PostHog client wiring behind public environment variables.
- [ ] Provide and verify real self-hosted PostHog endpoint and project token.
- [x] Wire Discord destination.
- [ ] Wire email capture destination once available.
- [ ] Run Lighthouse outside the current macOS sandbox.
- [x] Canonical metadata and OG/Twitter metadata helper.
- [x] Noindex Examples/Models until real artifacts exist.
- [x] Link footer colophon to the company methodology template.
- [x] Wire MDX components and pretty-code runtime options.
- [x] Publish proper multi-arch Website image through GHCR on push.

## Blockers

- Tailwind Plus source access is available from the founder but not yet connected to this repo.
- DNS and hosting details are available from the founder but not yet captured in repo config.
- PostHog endpoint and project key are not available yet, so analytics code is present but inactive unless configured and consented.
- Email capture destination is not available yet.
- Local `../Website-CD` checkout has `develop` checked out, but sandbox permissions blocked writing upstream metadata after the push. GitHub default branch and remote `develop` are correct.
- Website-CD deploy manifests are still pending DNS, hosting, and cluster path details, but the Website repo now publishes `ghcr.io/benchfinity/website` images using the Workbench branch/tag convention.
- Playwright tests are configured but Chromium cannot launch in this sandbox. It fails at macOS Mach port registration before test code runs.
- Lighthouse is configured for the representative route set but Chrome for Testing also fails to launch cleanly in this sandbox.
- Production audit currently reports the Next 16.2.6 transitive PostCSS advisory. `npm view next version` reports 16.2.6 as latest, and npm's forced audit fix would downgrade Next to 9.3.3, so no safe package fix is available at this point.
