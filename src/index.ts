// import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const cors = require("cors");

const startServer = async () => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res })
  });

  await createConnection().catch(e =>
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
