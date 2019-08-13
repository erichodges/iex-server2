"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
  type User {
    id: String!
    email: String!
    userName: String
    quoteList: [QuoteList]
  }

  type QuoteList {
    name: String
    id: String
    tickers: [String]
  }

  type Query {
    me: User
    user: User
    users: [User]
  }

  type Mutation {
    register(userName: String, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User!
    addQuoteList(tickers: [String]!, name: String): QuoteList!
    updateQuoteList(id: String, tickers: [String]!, name: String): QuoteList!
    removeQuoteList(id: String): Boolean!
    logout: Boolean!
  }
`;
//# sourceMappingURL=typeDefs.js.map