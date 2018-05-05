FROM node:8

RUN mkdir -p /var/jenkins_home

WORKDIR /var/jenkins_home

ONBUILD ADD . /var/jenkins_home

RUN npm i

ENTRYPOINT npm start

USER root

EXPOSE 9000

ENV PORT 9000


