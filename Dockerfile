FROM node:19-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY . ./

EXPOSE ${PORT}

CMD npm run migration:gen && npm run nodemon