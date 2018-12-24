FROM node:8.14.1-alpine

COPY . /app

WORKDIR /app

RUN npm install