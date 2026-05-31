# PLAN: Website Build

## Goal

Build benchfinity.com as a production-grade Next.js marketing, adoption, and content site that consumes the Benchfinity company OS assets from `../Company`.

## Approach

Use `../Company` as the local equivalent of the prompt's `./brand` source. Keep the Website repo on gitflow with `develop` as the default branch and phase work from `feature/website-build-foundation`. Build in the handoff's ten phases, keeping each phase independently reviewable and green before continuing.

## Files Affected

- `app/`, `components/`, `lib/`, `styles/`, `content/`, `public/`: new Next.js application, brand primitives, MDX content, SEO, analytics, copied assets.
- `docs/TODO.md`: phase checklist and blockers.
- `docs/SESSION-STATE.md`: durable session notes.
- `../Website-CD`: new local GitOps repo for P9, with a remote still to be created.

## Source Rules

- Website spec wins over handoff and downstream docs.
- Handoff path `./brand` maps to local `../Company`.
- No Gridfinity affiliation disclaimer, despite `marketing/seo-strategy.md` carrying an older conflicting note.
- Use only honest-state language: baseplate generation is live; orchestration, accounts, bins, dividers, foam, wall mounts, and tool tracing are roadmap.
- Two CTAs only: build something now, and create an account and build entire systems.
- PostHog, Discord, and email capture stay stubbed behind environment variables until real values exist.

## Phase Breakdown

1. P0: Scaffold Next.js 16, React 19, TypeScript strict, Tailwind v4, Node 22, npm, ESLint, Prettier, Playwright, Lighthouse CI, MDX, sitemap, standalone output.
2. P1: Design system, Tailwind `@theme`, IBM Plex fonts, brand primitives, dark canvas, visual gate baseline.
3. P2: Site shell, nav, footer, consent banner, asset copy from `../Company`.
4. P3: Home page with locked hero, two CTAs, honest-state sections, and open-source strip.
5. P4: Core pages: How it works, Use Cases, featured use cases, Open Source, FAQ, Examples and Models.
6. P5: Blog MDX pipeline and seed posts.
7. P6: SEO metadata, OG, JSON-LD, sitemap, robots, pinned title and meta length checks.
8. P7: PostHog consent-gated analytics, Privacy page, Cookie page.
9. P8: Quality gates and audits: Playwright, Lighthouse, responsive, accessibility, copy bans, brand visual gates.
10. P9: Website-CD GitOps scaffold, Dockerfile, CI, Kustomize overlays, staging-first deploy path.

## Open Questions

- Provide Tailwind Plus component source location or access workflow before P1 and page composition.
- Provide DNS and hosting details before P9.
- Provide PostHog endpoint and project key before P7 launch readiness.
- Provide Discord invite and email capture destination before CTA-b is considered production-ready.
- Create GitHub remote `BenchFinity/Website-CD` before CD push or PR work.
