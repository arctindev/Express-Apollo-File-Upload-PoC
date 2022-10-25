import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Upload
  
  type Response {
    success: Boolean
  }

  type Query {
    files: [String]
  }

  type Mutation {
    uploadFile(file: Upload!): Response
  }
`;

export default typeDefs;
