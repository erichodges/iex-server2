FROM node

WORKDIR /stockApp

COPY ./package.json .

RUN npm i -g yarn
RUN yarn install --production

COPY ./dist ./dist
COPY ./ormconfigProd.json ./dist/ormconfig.json

RUN ls ./dist

EXPOSE 4000
CMD ["node", "dist/index.js"]