FROM node

WORKDIR /stockApp

COPY ./package.json .

RUN npm i -g yarn
RUN yarn instill --production

COPY ./dist .
COPY ./ormconfig.json .
