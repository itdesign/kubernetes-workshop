FROM node:8-alpine

CMD mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY src src
COPY tsconfig.json .
RUN yarn build

EXPOSE 8081

CMD [ "yarn", "start" ]
