"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const QuoteList_1 = require("./entity/QuoteList");
const User_1 = require("./entity/User");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const startServer = () => __awaiter(this, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        context: ({ req, res }) => ({ req, res })
    });
    process.env.NODE_ENV === "production"
        ? yield typeorm_1.createConnection({
            url: process.env.DATABASE_URL,
            type: "postgres",
            dropSchema: false,
            synchronize: true,
            logging: false,
            entities: [User_1.User, QuoteList_1.QuoteList]
        })
        : typeorm_1.createConnection().catch(e => console.log("DB connection error:" + e.message));
    const app = express();
    app.use(cors({
        origin: "http://localhost:3012",
        credentials: true
    }));
    app.use(session({
        secret: "akdjklajskfjasf",
        resave: false,
        saveUninitialized: false
    }));
    server.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 4000;
    app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
startServer();
//# sourceMappingURL=index.js.map