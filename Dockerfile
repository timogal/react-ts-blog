FROM node:8

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY ./package.json /usr/app

RUN npm i

COPY . /usr/app

CMD ["npm","start"]

USER root

EXPOSE 9000

ENV PORT 9000


