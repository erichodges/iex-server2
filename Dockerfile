FROM node

WORKDIR /stockApp

COPY ./package.json .

RUN npm i -g yarn
RUN yarn instill --production

COPY ./dist ./dist
COPY ./ormconfig.json .

EXPOSE 4000

CMD ["node", "dist/index.js"]