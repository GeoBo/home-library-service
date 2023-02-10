FROM node:18-alpine

WORKDIR /app

COPY --chown=node:node ./package.json ./package-lock.json ./
# COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY --chown=node:node . ./
# COPY . ./

EXPOSE 4000

USER node

CMD ["npm", "run", "nodemon"]