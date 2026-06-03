# Deployment

How this app (`BenchFinity/Website`) reaches production. The app is **live at
`https://www.benchfinity.com`** (apex `benchfinity.com` 301-redirects to `www`).

This repo owns the **app + the container image**. The Kubernetes manifests live
in a separate GitOps repo, [`BenchFinity/Website-CD`](https://github.com/BenchFinity/Website-CD),
and ArgoCD reconciles them onto the `k8s-prod` cluster.

## Pipeline (code → live)

```
push to main
  → CI (.github/workflows/ci.yml): validate (lint, typecheck, build, e2e, lighthouse, npm audit)
                                   → trivy image scan → build & push image to GHCR
  → image: ghcr.io/benchfinity/website:<version>-<sha>   (immutable, PRIVATE package)
  → deploy job auto-bumps newTag in Website-CD/overlays/production (main)
  → ArgoCD (benchfinity-website-prod) syncs Website-CD → rolling deploy on k8s-prod → live
```

### Image tags by branch

| Branch              | Tag pushed                                                              | Used for           |
| ------------------- | ----------------------------------------------------------------------- | ------------------ |
| `main`              | `:<version>` + immutable `:<version>-<sha>` (deployed) + GitHub release | **production**     |
| `develop`           | `:<version>-SNAPSHOT.<sha>` and `:develop`                              | integration        |
| `release/*`, `rc/*` | `:<version>-rc.<sha>` (prerelease)                                      | release candidates |
| `feature/*`         | `:<version>-<branch>-<sha>-SNAPSHOT`                                    | previews           |

**Cutting a production release is fully automated:** merge `develop → main`. CI
builds, scans, and publishes the immutable `ghcr.io/benchfinity/website:<version>-<sha>`
image (plus the human-readable `:<version>` and a GitHub release), then the
`deploy` job auto-bumps `newTag` in `Website-CD/overlays/production/kustomization.yaml`
on `main` and pushes. ArgoCD auto-syncs and rolls it out — **no manual tag bump**.
The immutable `:<version>-<sha>` tag guarantees the desired state changes on every
release so ArgoCD always detects and deploys it.

CI writes to `Website-CD` over SSH using a write-scoped deploy key whose private
half is stored as the `WEBSITE_CD_DEPLOY_KEY` secret in `BenchFinity/Website`
(public half is a deploy key on `BenchFinity/Website-CD`).

## Runtime contract (must hold for the image to run on k8s-prod)

The cluster enforces **restricted PodSecurity**, so the image **must run as a
nonroot user**. The `Dockerfile` runner stage sets `USER node` for this — do not
remove it. The container:

- listens on **`:3000`** (`PORT=3000`, Next.js `output: "standalone"`, `server.js`);
- is probed (readiness/liveness) on `/`;
- runs with `runAsNonRoot`, dropped capabilities, and a read-write root FS (Next
  may write cache).

If you change the listen port, the build output layout, or the entrypoint,
update `Website-CD/base/benchfinity-website-deployment.yaml` to match.

## Build-time configuration (PostHog etc.)

`NEXT_PUBLIC_*` values (e.g. `NEXT_PUBLIC_POSTHOG_KEY` / `_HOST`) are **baked at
build time** by Next.js, so they must be present in **CI when the image is
built**, not injected at runtime. PostHog is self-hosted (a future Platform-CD
addition); point these at that instance. Server-only env can be added to the
Deployment in `Website-CD` instead.

## Where things live

| Concern                                                                            | Location                                     |
| ---------------------------------------------------------------------------------- | -------------------------------------------- |
| App code, Dockerfile, CI                                                           | this repo                                    |
| Container image                                                                    | `ghcr.io/benchfinity/website` (private)      |
| K8s manifests (Deployment, Ingress, redirects, cert)                               | `BenchFinity/Website-CD`                     |
| ArgoCD Application, AppProject, sealed secrets (GHCR pull secret, repo deploy key) | `KofTwentyTwo/k8s-app-of-apps`               |
| Edge / DNS / TLS model                                                             | `k8s-app-of-apps/docs/networking-dns-tls.md` |

## Production facts

- Canonical host **`www.benchfinity.com`**; apex 301 → www; `http` 301 → `https`.
- TLS: cert-manager Let's Encrypt cert (apex + www), auto-renewed.
- Namespace `benchfinity-website-prod`, 2 replicas, PDB `minAvailable: 1`.
- Image is **private**, pulled via a sealed `ghcr-pull-secret` in the cluster.
