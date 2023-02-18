FROM node:19-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY . ./

EXPOSE 4000

CMD npm run migration:gen && npm run nodemon

# CMD ["npm", "run", "nodemon"]