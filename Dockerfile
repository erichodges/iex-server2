FROM node

WORKDIR /stockApp

COPY ./package.json .

RUN npm i -g yarn
RUN yarn install --production

COPY ./dist ./dist
COPY ./ormconfigProd.json ./ormconfig.json

EXPOSE 4000
CMD ["node", "dist/index.js"]