# Deployment

How this app (`BenchFinity/Website`) reaches production. The app is **live at
`https://www.benchfinity.com`** (apex `benchfinity.com` 301-redirects to `www`).

This repo owns the **app + the container image**. The Kubernetes manifests live
in a separate GitOps repo, [`BenchFinity/Website-CD`](https://github.com/BenchFinity/Website-CD),
and ArgoCD reconciles them onto the `k8s-prod` cluster.

## Pipeline (code → live)

```
push to a branch
  → CI (.github/workflows/ci.yml): validate (lint, typecheck, build, e2e, lighthouse, npm audit)
                                   → trivy image scan → build & push image to GHCR
  → image: ghcr.io/benchfinity/website:<tag>   (PRIVATE package)
  → (manual) bump newTag in Website-CD overlays/production
  → ArgoCD syncs Website-CD → rolling deploy on k8s-prod → live
```

### Image tags by branch

| Branch              | Tag pushed                                                       | Used for           |
| ------------------- | ---------------------------------------------------------------- | ------------------ |
| `main`              | clean semver `:<version>` (from `package.json`) + GitHub release | **production**     |
| `develop`           | `:<version>-SNAPSHOT.<sha>` and `:develop`                       | integration        |
| `release/*`, `rc/*` | `:<version>-rc.<sha>` (prerelease)                               | release candidates |
| `feature/*`         | `:<version>-<branch>-<sha>-SNAPSHOT`                             | previews           |

**Cutting a production release:** merge `develop → main`. CI publishes
`ghcr.io/benchfinity/website:<version>` and a GitHub release. Then bump
`newTag` in `Website-CD/overlays/production/kustomization.yaml` and merge — ArgoCD
rolls it out. (CI does not auto-update the CD repo; the tag bump is intentional.)

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
