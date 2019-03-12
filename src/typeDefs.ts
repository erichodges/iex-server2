import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    quoteList: QuoteList
  }

  type QuoteList {
    tickers: [String]
  }

  type Query {
    me: User
    user: User
  }

  type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User!
    addQuoteList(tickers: [String]!): QuoteList!
  }
`;
