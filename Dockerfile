FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install --save
COPY . /usr/src/app
RUN npm install open --save

EXPOSE 80
CMD [ "npm", "start" ]
