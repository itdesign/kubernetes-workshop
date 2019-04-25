FROM node:8-alpine

CMD mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY src src
COPY tsconfig.json .
RUN yarn build

ARG appVersion=1
ENV APP_VERSION=$appVersion

EXPOSE 3000

CMD [ "yarn", "start" ]
