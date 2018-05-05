FROM node:8

WORKDIR /var/jenkins_home/workspace/blog-web

RUN npm i

EXPOSE 9000

ENV PORT 9000

WORKDIR /var/jenkins_home/workspace/blog-web

ENTRYPOINT npm start

USER root


