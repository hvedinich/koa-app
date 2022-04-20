
FROM node:14.17.1-buster-slim as BUILD_IMAGE

RUN apt-get update && \
  apt-get install -y python make g++

ARG DB_URL

ENV NODE_ENV=production
ENV DB_URL=${DB_URL}

WORKDIR /app
COPY . /app

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc && \
  npm ci --also=dev && \
  rm ~/.npmrc

FROM node:14.17.1-buster-slim

WORKDIR /app

COPY --from=BUILD_IMAGE /app /app

ENV PORT=8080
EXPOSE 8080

CMD [ "npm", "start" ]