FROM node:latest

RUN npm i

EXPOSE 9000:9000

ENV PORT 9000

ENTRYPOINT npm start


