const cors = require("cors");
const express = require("express");
const { importSchema } = require("graphql-import");
const { makeExecutableSchema } = require("graphql-tools");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

// Importing models
const Post = require("./models/posts")

require("dotenv").config(); // Configuring env variables

const app = express();
app.use(cors());

const typeDefs = importSchema("./graphql/schema.gql");
const resolvers = {};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const a = new Post();

app.use(
  "",
  graphqlHttp({
    schema: schema,
    rootValue: {
      getPost: Post.getPost
    },
    graphiql: true
  })
);

mongoose.connect(process.env.DBURL).then(() => {
  app.listen(process.env.PORT);
});
