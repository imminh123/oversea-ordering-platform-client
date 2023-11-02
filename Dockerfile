FROM node:14.15.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD [ "node", "express/index.js" ]