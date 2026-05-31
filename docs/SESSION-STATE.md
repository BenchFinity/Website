# Session State

## 2026-05-30

Working directory: `/Users/james.maes/Git.Local/benchfinity/Website`.

Ticket: skipped by user.

Branches: created local `develop` from `main`, pushed `develop` to `origin`, set GitHub default branch for `BenchFinity/Website` to `develop`, then created `feature/website-build-foundation` from `develop`.

Path decisions: prompt `./brand` maps to local `../Company`; Website app lives in `../Website`; CD repo should be new `../Website-CD`; existing `../Workbench-CD` is unrelated and is not a git repo.

Remote status: `BenchFinity/Website` exists and is private. `BenchFinity/Website-CD` exists and is private. Both GitHub repos now have `develop` as the default branch.

Website-CD status: cloned `git@github.com:BenchFinity/Website-CD.git` to `../Website-CD`, created local `develop` from `main`, pushed remote `develop`, and set the GitHub default branch to `develop`. Sandbox permissions blocked writing local upstream metadata after the push because `../Website-CD` is outside the writable root; GitHub default branch and remote `develop` are verified.

Important source conflict: `marketing/seo-strategy.md` includes an older Gridfinity affiliation disclaimer suggestion. The locked website spec, handoff, and legal trademark posture say no disclaimer, so the site must not include one.

Founder prerequisites: Tailwind Plus access and DNS details exist but are not yet wired into the repo. Discord invite is `https://discord.gg/R3sc8fWJMJ` and is wired into the site defaults. PostHog and email capture are not ready, so these stay stubbed behind environment variables with clear TODOs.

P0 scaffold status: created the Next.js 16.2.6 app with React 19, TypeScript strict, Tailwind v4, MDX, sitemap, robots, Playwright, Lighthouse config, standalone output, and copied public brand assets from `../Company`.

V1 site surface status: Home, How it works, Use Cases index, Model railroad, Toolbox buildout, Tool tracing, Open Source, Blog index, two seeded Blog posts, Examples and Models, FAQ, Privacy, and Cookie Policy all exist. Examples and Models uses honest placeholder slots until real Printables, MakerWorld, YouTube, and subreddit artifacts exist.

Clean-room review remediation: consent-gated PostHog wiring is implemented behind `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` or `NEXT_PUBLIC_POSTHOG_KEY` plus `NEXT_PUBLIC_POSTHOG_HOST`; CTA and outbound link events are tracked only after consent. The cookie banner can be reopened from the footer. Privacy copy now includes a stable contact address via `NEXT_PUBLIC_PRIVACY_EMAIL`. Page metadata now uses canonical, OG, and Twitter helpers; Examples/Models is noindex and excluded from the sitemap until real artifacts exist. Blog MDX now uses the shared MDX components and pretty-code runtime options. The footer colophon links to `TEMPLATE.md`. GitHub Actions CI now follows the Workbench pattern for validate, dependency review, image scan, GHCR multi-arch image publish, and release creation. The Website image publishes as `ghcr.io/benchfinity/website` using the same branch/tag convention as Workbench.

Verification: format check, lint, typecheck, production build, Docker build, Docker container smoke, and `npm audit --audit-level=high` pass. The Docker build was run with `DOCKER_CONFIG=/Users/james.maes/.cache/docker-codex` because the sandbox cannot write Docker Buildx activity under `~/.docker`. The audit still reports moderate Next/PostCSS advisories with no safe force fix. The standalone server is running at `http://127.0.0.1:3001`, and HTTP smoke checks pass for `/`, `/how-it-works`, `/use-cases`, `/use-cases/model-railroad`, `/use-cases/toolbox-buildout`, `/use-cases/tool-tracing`, `/open-source`, `/blog`, `/blog/devlog-01`, `/blog/orchestration-thesis`, `/examples`, `/faq`, `/privacy`, `/cookies`, `/sitemap.xml`, `/robots.txt`, `/site.webmanifest`, `/favicon-192.png`, and `/favicon-512.png`. Smoke checks also verified pinned title, pinned description, home canonical, Examples noindex, Examples sitemap exclusion, and privacy contact copy.

Known verification limits: Playwright is configured for the expanded nav, metadata, and consent suite, but Chromium cannot launch inside the current macOS sandbox because Mach port registration is denied before tests run. Lighthouse found Chrome through the Playwright path, but Chrome for Testing crashed and Lighthouse could not connect to it. The in-app browser is also unavailable in this session, so visual/browser verification still needs to run outside this sandbox. Production audit reports the current Next 16.2.6 transitive PostCSS advisory; the latest Next is still 16.2.6, and npm's forced fix would downgrade Next to 9.3.3.
