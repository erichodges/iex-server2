require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { QuoteList } from "./entity/QuoteList";
import { User } from "./entity/User";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const express = require("express");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");

const startServer = async () => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res })
  });

  console.log(process.env.NODE_ENV);

  process.env.NODE_ENV === "production"
    ? await createConnection({
        url: process.env.DATABASE_URL,
        type: "postgres",
        dropSchema: false,
        synchronize: true,
        logging: false,
        entities: [User, QuoteList]
      } as any)
    : createConnection().catch(e =>
        console.log("DB connection error:" + e.message)
      );

  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_HOST,
      credentials: true
    })
  );

  let RedisStore = require("connect-redis")(session);
  let client = redis.createClient(process.env.REDIS_URL);

  app.use(
    session({
      store: new RedisStore({ client }),
      secret: "akdjklajskfjasf",
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  const port = process.env.PORT || 4000;

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
