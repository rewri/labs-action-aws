FROM node:16-slim as BUILDER

LABEL maintainer='Rérisson Fumes'

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@9.2.0

RUN npm install

COPY src ./src

FROM node:16-alpine

ARG NODE_ENV

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app ./

USER node

EXPOSE 3020

CMD [ "npm", "run-script", "start"]
