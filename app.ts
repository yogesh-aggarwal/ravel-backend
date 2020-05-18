import { gql, ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";

import { connect } from "mongoose";
import resolvers from "./resolver";

require("dotenv").config(); // Configure env variables

const typeDefs = gql(importSchema("./graphql/schema.gql")); // Parse schema

// Connection
connect(process.env.DBURL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen({ port: process.env.PORT }).then(({ port }: any) => {
    console.log(`🚀 Server is up and running at http://localhost:${port}`);
  });
});
