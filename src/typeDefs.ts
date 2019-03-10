import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    quoteList: QuoteList
  }

  type QuoteList {
    tickers: [String]
  }

  type Query {
    me: User
    user(id: Int!): User
  }

  # input QuoteListInput {
  #   tickers: [String]!
  # }

  type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User!
    addQuoteList(tickers: [String]!): QuoteList!
  }
`;
