import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const startServer = async () => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res })
  });

  process.env.NODE_ENV === "production"
    ? await createConnection({
        url: process.env.DATABASE_URL,
        type: "postgres",
        dropSchema: false,
        synchronize: true,
        logging: false,
        entities: ["entity/**/*.js"]
      } as any)
    : createConnection().catch(e =>
        console.log("DB connection error:" + e.message)
      ); // connects to the DB

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3012",
      credentials: true
    })
  );
  app.use(
    session({
      secret: "akdjklajskfjasf",
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
