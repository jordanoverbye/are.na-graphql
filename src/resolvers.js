const resolvers = {
  Query: {
    /**
     ** Blocks
     */
    _allBlocksMeta: async (
      _source,
      { search, page, size },
      { dataSources }
    ) => {
      return dataSources.arenaAPI.getBlocksMeta({ search, page, size });
    },
    allBlocks: async (_source, { search, page, size }, { dataSources }) => {
      return dataSources.arenaAPI.getBlocks({ search, page, size });
    },
    Block: async (_source, { id }, { dataSources }) => {
      return dataSources.arenaAPI.getBlock({ id });
    },
    /**
     ** Channels
     */
    _allChannelsMeta: async (
      _source,
      { search, page, size },
      { dataSources }
    ) => {
      return dataSources.arenaAPI.getChannelsMeta({ search, page, size });
    },
    allChannels: async (_source, { search, page, size }, { dataSources }) => {
      return dataSources.arenaAPI.getChannels({ search, page, size });
    },
    Channel: async (_source, { slug, page, size }, { dataSources }) => {
      return dataSources.arenaAPI.getChannel({ slug, page, size });
    },
    /**
     ** Users
     */
    _allUsersMeta: async (_source, { search, page, size }, { dataSources }) => {
      return dataSources.arenaAPI.getUsersMeta({ search, page, size });
    },
    allUsers: async (_source, { search, page, size }, { dataSources }) => {
      return dataSources.arenaAPI.getUsers({ search, page, size });
    },
    User: async (_source, { id }, { dataSources }) => {
      return dataSources.arenaAPI.getUser({ id });
    },
  },
};

module.exports = { resolvers };
