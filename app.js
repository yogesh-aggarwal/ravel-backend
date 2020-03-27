const cors = require("cors");
const express = require("express");
const { importSchema } = require("graphql-import");
const { makeExecutableSchema } = require("graphql-tools");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const resolver = require("./resolver")

require("dotenv").config(); // Configuring env variables

const app = express();
app.use(cors());

const typeDefs = importSchema("./graphql/schema.gql");
const resolvers = {};

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "",
  graphqlHttp({
    schema: schema,
    rootValue: {
      // Post
      createPost: resolver.createPost,
      getPost: resolver.getPost,
      deletePost: resolver.deletePost,
      updatePost: resolver.updatePost,

      // Merchandise
      createMerchandise: resolver.createMerchandise,

      // User
      createUser: resolver.createUser,
    },
    graphiql: true
  })
);

mongoose.connect(process.env.DBURL).then(() => {
  app.listen(process.env.PORT);
});
