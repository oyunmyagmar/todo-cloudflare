import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { getTodos } from "@/app/graphql/resolvers/getTodos";
import { createTodos } from "@/app/graphql/resolvers/createTodos";

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    isDone: Boolean!
  }

  type Query {
    hello: String
    getTodos: [Todo!]!
  }

  type Mutation {
    createTodos(id: ID!, title: String!, isDone: Boolean!): Todo!
  }
`;
const resolvers = {
  Query: {
    hello: () => "world",
    getTodos,
  },
  Mutation: {
    createTodos,
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async ({ env }) => {
    return { env };
  },
});

export { handler as GET, handler as POST };
