FROM node:20-buster-slim

WORKDIR /app

COPY package.json ./ 

COPY yarn.lock ./

RUN yarn install

COPY . .

COPY .env .

COPY  prisma ./prisma

RUN yarn prisma generate

RUN yarn build

EXPOSE 3010

CMD ["yarn", "start:prod"]
