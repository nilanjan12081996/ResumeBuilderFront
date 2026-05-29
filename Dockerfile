# FROM node:20-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY package.json package-lock.json* ./
# RUN npm ci

# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Increase Node memory limit
# ENV NODE_OPTIONS="--max-old-space-size=8192"

# RUN npm run build

# # Production image
# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3989
# ENV PORT=3989
# ENV HOSTNAME="0.0.0.0"

# CMD ["node", "server.js"]


FROM node:20-alpine AS base
 
# 1. Install dependencies stage

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
 
COPY package.json package-lock.json* ./
 
# Lower memory footprint optimizations for small VPS setups

ENV NPM_CONFIG_MAX_SOCKETS=5

RUN npm install --network-timeout=300000 --prefer-offline --no-audit --progress=false
 
# 2. Rebuild the source code stage

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
 
# Set this dynamically to 1.5GB so it comfortably fits a standard VPS limit without crashing

ENV NODE_OPTIONS="--max-old-space-size=1536"
 
RUN npm run build
 
# 3. Production image runner stage

FROM base AS runner

WORKDIR /app
 
ENV NODE_ENV=production
 
# Copy necessary production build layers

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json ./package.json
 
EXPOSE 3000
 
CMD ["npm", "start"]
 