# Build context is the repo root: docker build -f apps/dashboard/Dockerfile .
FROM node:24-slim AS base
RUN npm install -g pnpm@12.3.4 turbo@2.10.5

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune @dukkani/dashboard --docker

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
ENV npm_config_fetch_retries=5 npm_config_fetch_timeout=300000 npm_config_network_concurrency=8
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY --from=pruner /app/out/full/ .
# turbo prune does not copy the root scripts folder, and build runs scripts/with-root-env.mjs
COPY --from=pruner /app/scripts ./scripts
# prisma client needs the schema, so generate once the sources are copied
RUN pnpm --filter @dukkani/db db:generate
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WEB_URL
ARG NEXT_PUBLIC_DASHBOARD_URL
ARG NEXT_PUBLIC_STORE_DOMAIN
ARG NEXT_PUBLIC_ALLOWED_ORIGIN
ARG NEXT_PUBLIC_NODE_ENV
RUN --mount=type=secret,id=turbo_token,env=TURBO_TOKEN \
    --mount=type=secret,id=turbo_team,env=TURBO_TEAM \
    pnpm turbo build --filter=@dukkani/dashboard

FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=builder --chown=node:node /app/apps/dashboard/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/dashboard/.next/static ./apps/dashboard/.next/static
COPY --from=builder --chown=node:node /app/apps/dashboard/public ./apps/dashboard/public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD node -e "fetch('http://127.0.0.1:3000/login').then((r) => process.exit(r.status < 500 ? 0 : 1), () => process.exit(1))"
CMD ["node", "apps/dashboard/server.js"]
