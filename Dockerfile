FROM node:lts-alpine

WORKDIR /app

COPY . .
RUN npm ci
CMD ["node" , "app.js"]