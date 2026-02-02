import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { getTodos } from "@/app/graphql/getTodos";
import { createTodos } from "@/app/graphql/createTodos";
import { useMutation } from "@apollo/client/react";

const resolvers = {
  Query: {
    hello: () => "world",
    createTodos,
    getTodos,
  },
};

const typeDefs = gql`
  type Todos {
    title: String
    isDone: Boolean
    id: String
  }

  type Query {
    hello: String
    createTodos: [Todos]
    getTodos: [Todos]
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
