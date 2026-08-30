# glibc Node toolchain, nonroot user, digest-pinned to match Workbench's
# Chainguard base-image posture. Next SSR needs Node in the final image, so this
# uses the Node runtime instead of Workbench's static nginx runtime.
FROM cgr.dev/chainguard/node:latest-dev@sha256:4cd2bedce5955f933c8dca76df9bdff301505f3d0994c1e7e829a01e1718e650 AS deps
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM cgr.dev/chainguard/node:latest-dev@sha256:4cd2bedce5955f933c8dca76df9bdff301505f3d0994c1e7e829a01e1718e650 AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build

FROM cgr.dev/chainguard/node@sha256:a422ef283675c760d801378646f2a7fdc96f4e2023121a247e215ed3cd39f199 AS runner
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
