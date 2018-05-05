FROM node:8

RUN npm i

EXPOSE 9000

ENV PORT 9000

ENTRYPOINT npm start

USER jenkins


