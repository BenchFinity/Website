# glibc Node toolchain, nonroot user, digest-pinned to match Workbench's
# Chainguard base-image posture. Next SSR needs Node in the final image, so this
# uses the Node runtime instead of Workbench's static nginx runtime.
FROM cgr.dev/chainguard/node:latest-dev@sha256:213d9ba7e6cc2cde635b0c8f31c9792017da19e8c6945edde1dbc039c8bd80c7 AS deps
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM cgr.dev/chainguard/node:latest-dev@sha256:213d9ba7e6cc2cde635b0c8f31c9792017da19e8c6945edde1dbc039c8bd80c7 AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build

FROM cgr.dev/chainguard/node@sha256:6e6a0a6b07530980a1192cca22750e87b4614e8185173142fc7e4fd4a3ad4c03 AS runner
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
