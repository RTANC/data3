FROM node:8.14.1-alpine

WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm", "start"]