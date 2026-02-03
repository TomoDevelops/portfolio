FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:1
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/dist /app/dist
WORKDIR /app/dist
ENV PORT=3000 HOST=0.0.0.0
EXPOSE 3000
CMD ["bun", "server/entry.mjs"]
