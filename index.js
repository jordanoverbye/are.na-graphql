const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type AllChannels {
    authenticated: Boolean
    blocks: [Block]
    channels: [Channel]
    current_page: Int
    length: Int
    per: Int
    term: String
    total_pages: Int
    users: [User]
  }

  type Channel {
    accessible_by_ids: [Int]
    added_to_at: String
    base_class: String
    channel_ids: [Int]
    class: String
    collaboration: Boolean
    collaborator_ids: [Int]
    contents_updated_at: String
    contents: [Block]
    connections: [Channel]
    created_at: String
    followed_by_ids: [Int]
    follower_count: Int
    #  group: null
    group_collaborator_ids: [Int]
    # highlight: null
    id: Int
    kind: String
    length: Int
    metadata: Metadata
    # nsfw?: Boolean
    open: Boolean
    owned_by_ids: [Int]
    owner_id: Int
    owner_slug: String
    owner_type: String
    published: Boolean
    share_link: String
    slug: String
    sort: [Int]
    state: State
    status: String
    title: String
    updated_at: String
    user: User
    user_id: Int
    visibility: String
  }

  type Metadata {
    description: String
  }

  type Attatchment {
    content_type: String
    extension: String
    file_name: String
    file_size: Int
    file_size_display: String
    url: String
  }

  type Collection {
    base_class: String
    channel_title: String
    channels: [Channel]
    class: String
    current_page: Int
    length: Int
    per: Int
    total_pages: Int
  }

  type AllBlocks {
    term: String
    per: Int
    current_page: Int
    total_pages: Int
    length: Int
    authenticated: Boolean
    blocks: [Block]
  }

  type Block {
    attachment: Attatchment
    base_class: String
    class: String
    comment_count: Int
    connected_at: String
    connected_by_user_id: Int
    connected_by_user_slug: String
    connected_by_username: String
    connection_id: Int
    content: String
    content_html: String
    created_at: String
    description: String
    description_html: String
    embed: BlockEmbed
    generated_title: String
    id: Int
    image: BlockImage
    metadata: Metadata
    position: Int
    selected: Boolean
    source: BlockSource
    state: State
    title: String
    updated_at: String
    user: User
    visibility: String
  }

  type BlockImage {
    content_type: String
    display: Image
    filename: String
    large: Image
    original: Image
    square: Image
    thumb: Image
    updated_at: String
  }

  type BlockSource {
    url: String
    title: String
    provider: BlockSourceProvider
  }

  type BlockSourceProvider {
    name: String
    url: String
  }

  type BlockEmbed {
    author_name: String
    author_url: String
    height: Int
    html: String
    source_url: String
    thumbnail_url: String
    title: String
    type: String
    url: String
    width: Int
  }

  type Image {
    url: String
    file_size: Int
    file_size_display: String
  }

  enum State {
    available
    failure
    processed
    processing
  }

  type AllUsers {
    term: String
    per: Int
    current_page: Int
    total_pages: Int
    length: Int
    authenticated: Boolean
    users: [User]
  }

  type User {
    avatar: String
    avatar_image: UserAvatarImage
    badge: String
    base_class: String
    can_index: Boolean
    channel_count: Int
    class: String
    created_at: String
    first_name: String
    follower_count: Int
    following_count: Int
    full_name: String
    id: Int
    initials: String
    is_confirmed: Boolean
    is_exceeding_private_connections_limit: Boolean
    is_lifetime_premium: Boolean
    is_pending_confirmation: Boolean
    is_pending_reconfirmation: Boolean
    is_premium: Boolean
    is_supporter: Boolean
    last_name: String
    metadata: Metadata
    profile_id: Int
    slug: String
    username: String
  }

  type UserAvatarImage {
    thumb: String
    display: String
  }

  type Query {
    allChannels(page: Int, size: Int, search: String): AllChannels
    Channel(slug: String!): Channel

    allBlocks(page: Int, size: Int, search: String!): AllBlocks
    Block(id: Int!): Block

    allUsers(page: Int, size: Int, search: String!): AllUsers
    User(id: Int): User
  }
`;

const resolvers = {
  Query: {
    allChannels: async (parent, args) => {
      const { page = 1, size = 10, search } = args;

      const url = search
        ? `https://api.are.na/v2/search/channels?q=${search}&page=${page}&per=${size}`
        : `https://api.are.na/v2/channels?page=${page}&per=${size}`;

      const data = await (await fetch(url)).json();

      console.log(
        data.channels.map((channel) => channel.contents).filter(Boolean)
      );

      return data;
    },
    Channel: async (parent, args) => {
      const { slug } = args;
      const data = await (
        await fetch(`https://api.are.na/v2/channels/${slug}`)
      ).json();
      return data;
    },

    allBlocks: async (parent, args) => {
      const { search, page = 1, size = 20 } = args;
      const data = await (
        await fetch(
          `https://api.are.na/v2/search/blocks?q=${search}&page=${page}&per=${size}`
        )
      ).json();
      return data;
    },
    Block: async (parent, args) => {
      const { id } = args;
      const data = await (
        await fetch(`http://api.are.na/v2/blocks/${id}`)
      ).json();
      return data;
    },

    allUsers: async (parent, args) => {
      const { search, page = 1, size = 20 } = args;
      const data = await (
        await fetch(
          `https://api.are.na/v2/search/users?q=${search}&page=${page}&per=${size}`
        )
      ).json();
      return data;
    },
    User: async (parent, args) => {
      const { id } = args;
      const data = await (
        await fetch(`http://api.are.na/v2/users/${id}`)
      ).json();
      return data;
    },
  },
  Channel: {
    connections: async (parent) => {
      const { slug } = parent;
      const data = await (
        await fetch(`https://api.are.na/v2/channels/${slug}/connections`)
      ).json();
      return data;
    },
    contents: async (parent) => {
      const { slug } = parent;
      const data = await (
        await fetch(`https://api.are.na/v2/channels/${slug}`)
      ).json();
      return data.contents;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
