FROM node:20-buster-slim

WORKDIR /app

COPY package.json ./ 

COPY yarn.lock ./
RUN apt-get update -y && apt-get install -y openssl
RUN yarn install
RUN yarn cache clean
COPY . .
RUN yarn remove bcrypt
RUN yarn add bcrypt
COPY .env .

COPY  prisma ./prisma

RUN yarn prisma generate

RUN yarn build

EXPOSE 3010

CMD ["yarn", "start:prod"]
