# syntax=docker/dockerfile:1
#
# Build context HARUS root monorepo (bukan apps/web), karena butuh
# pnpm-workspace.yaml + pnpm-lock.yaml di root:
#   docker build -f apps/web/Dockerfile -t dirakitpro-web .
# Image ini untuk containerized deploy/staging nanti, bukan dev sehari-hari
# (dev pakai `pnpm dev` di host — lihat README).

FROM node:22-alpine AS base
RUN corepack enable

FROM base AS builder
WORKDIR /repo
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter web run build

FROM base AS runner
WORKDIR /repo
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /repo/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static

USER nextjs

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["node", "apps/web/server.js"]
