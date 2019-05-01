FROM node:8-alpine

CMD mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY src src
COPY static static
COPY tsconfig.json .
RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]
