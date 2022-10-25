import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolver.js";
import cors from "cors";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(graphqlUploadExpress());

const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  formatError: (error) => {
    return error;
  },
  context: ({ req, res }) => {
    return { req, res };
  },
});

await server.start();

server.applyMiddleware({ app, path: "/api/graphql" });

app.listen(3333, () => {
  console.log("app is listening to port 3333");
});
