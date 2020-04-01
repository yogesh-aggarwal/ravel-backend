const { gql, ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

const mongoose = require("mongoose");

const typeDefs = gql(importSchema("./graphql/schema.gql"));
const resolvers = require("./resolver");

mongoose.connect(process.env.DBURL).then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });
  // console.log(server);
  server.listen({ port: 80 }).then(info => {
    console.log(`🚀 Server is up and running at http://localhost:${info.port}`);
  });
});
