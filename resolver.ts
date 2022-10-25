import fs from "fs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const files = [];

export default {
  Upload: GraphQLUpload,
  Query: {
    files: () => files,
  },
  Mutation: {
    uploadFile: async (_, file) => {
      const { filename, createReadStream } = await file.file;

      await new Promise((res) =>
        createReadStream().pipe(fs.createWriteStream(filename)).on("close", res)
      );

      files.push(filename);

      return { success: true };
    },
  },
};
