const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");
const { ArenaDataSource } = require("./arena-data-source");
const { gql } = require("apollo-server");

const { resolvers } = require("./resolvers");

const typeDefs = gql`
  ${fs.readFileSync(path.join(__dirname, "..", "schema.graphql"))}
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => {
    return {
      arenaAPI: new ArenaDataSource(),
    };
  },
  context: ({ req }) => {
    return {
      authorization: req.headers.authorization,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
