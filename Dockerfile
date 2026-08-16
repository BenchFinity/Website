# glibc Node toolchain, nonroot user, digest-pinned to match Workbench's
# Chainguard base-image posture. Next SSR needs Node in the final image, so this
# uses the Node runtime instead of Workbench's static nginx runtime.
FROM cgr.dev/chainguard/node:latest-dev@sha256:5f539ca9ce7ed8b858059b3316640232bcb1ae7d3513ae67bb95527533bf1fba AS deps
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM cgr.dev/chainguard/node:latest-dev@sha256:5f539ca9ce7ed8b858059b3316640232bcb1ae7d3513ae67bb95527533bf1fba AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build

FROM cgr.dev/chainguard/node@sha256:f6c05914c890eb9a36836503015b21a38f54eca322b5de9a3ef475b32d7f4172 AS runner
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
WORKDIR /app

COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/public ./public

# Run as the nonroot 'node' user (numeric UID) so the image satisfies the
# cluster's restricted PodSecurity. runAsNonRoot REQUIRES a numeric user — a
# name ("node") makes k8s reject the pod: "image has non-numeric user (node)".
# 65532 is the chainguard/node nonroot uid (== the 'node' user).
USER 65532

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["server.js"]
