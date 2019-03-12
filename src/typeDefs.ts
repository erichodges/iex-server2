import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    userName: String
    quoteList: QuoteList
  }

  type QuoteList {
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
    addQuoteList(tickers: [String]!): QuoteList!
  }
`;
