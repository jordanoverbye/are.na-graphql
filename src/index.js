const { ApolloServer } = require("apollo-server");
const { ArenaDataSource } = require("./arena-data-source");

const { resolvers } = require("./resolvers");
const { typeDefs } = require("./type-defs");

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
