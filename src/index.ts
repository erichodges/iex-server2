// import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import * as session from "express-session";
const cors = require("cors");

const startServer = async () => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req })
  });

  await createConnection(); // connects to the DB

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
