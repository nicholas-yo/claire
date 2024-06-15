FROM node:20-alpine3.18 AS base

RUN apk add gcompat
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-bin-2.35-r0.apk
RUN apk --no-cache --force-overwrite add glibc-2.35-r0.apk glibc-bin-2.35-r0.apk

RUN npm i -g bun

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json bun.lockb ./

RUN \
  if [ -f bun.lockb ]; then bun i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

CMD ["bun", "start"]