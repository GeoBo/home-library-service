FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "nodemon"]