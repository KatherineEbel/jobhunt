FROM node:alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
COPY turbo.json turbo.json

RUN yarn install
RUN yarn turbo run build --scope=web...


FROM nginx
WORKDIR /app
EXPOSE 3000
COPY --from=installer /app/apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=installer /app/apps/web/build /usr/share/nginx/html
