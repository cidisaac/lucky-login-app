FROM node:18 as development

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y gcc
RUN apt-get install -y curl

ENV REDIS_HOST redis_db
ENV DB_HOST db
ENV DB_PORT 5432

COPY package*.json ./

RUN npm install --legacy-peer-deps glob rimraf

RUN npm install --legacy-peer-deps --only=development

COPY . .

RUN npm run build

FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]