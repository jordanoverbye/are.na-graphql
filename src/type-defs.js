const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    allBlocks(page: Int, size: Int, search: String!): [Block]
    _allBlocksMeta(page: Int, size: Int, search: String!): AllBlocksMeta
    Block(id: Int!): Block

    allChannels(page: Int, size: Int, search: String!): [Channel]
    _allChannelsMeta(page: Int, size: Int, search: String!): AllChannelsMeta
    Channel(slug: String!, page: Int, size: Int): Channel

    allUsers(page: Int, size: Int, search: String!): [User]
    _allUsersMeta(page: Int, size: Int, search: String!): AllUsersMeta
    User(id: Int): User
  }

  type Mutation {
    createChannel(data: CreateChannelInput): Channel
    createBlock(data: CreateBlockInput): Block
  }

  type AllBlocksMeta {
    currentPage: Int
    totalPages: Int
  }

  type Block {
    attachment: Attatchment
    baseClass: String
    class: String
    commentCount: Int
    connectedAt: String
    connectedByUserId: Int
    connectedByUserSlug: String
    connectedByUsername: String
    connectionId: Int
    content: String
    contentHtml: String
    createdAt: String
    description: String
    descriptionHtml: String
    embed: BlockEmbed
    generatedTitle: String
    id: Int
    image: BlockImage
    metadata: Metadata
    position: Int
    selected: Boolean
    source: BlockSource
    state: State
    title: String
    updatedAt: String
    user: User
    visibility: String
  }

  type BlockImage {
    contentType: String
    display: Image
    filename: String
    large: Image
    original: Image
    square: Image
    thumb: Image
    updatedAt: String
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
    authorName: String
    authorUrl: String
    height: Int
    html: String
    sourceUrl: String
    thumbnailUrl: String
    title: String
    type: String
    url: String
    width: Int
  }

  type AllChannelsMeta {
    currentPage: Int
    totalPages: Int
  }

  type Channel {
    addedToAt: String
    baseClass: String
    canIndex: Boolean
    className: String
    collaboration: Boolean
    collaboratorCount: Int
    collaborators: [User]
    contents: [Block]
    createdAt: String
    followerCount: Int
    id: Int
    kind: String
    length: Int
    manifest: Manifest
    metadata: Metadata

    # TODO Fix this field
    # nsfw?: Boolean

    open: Boolean
    owner: User
    published: Boolean
    shareLink: String
    slug: String
    status: Status
    title: String
    updatedAt: String
    user: User
    userId: Int
  }

  type User {
    avatar: String
    avatarImage: UserAvatarImage
    badge: String
    baseClass: String
    canIndex: Boolean
    channelCount: Int
    class: String
    createdAt: String
    firstName: String
    followerCount: Int
    followingCount: Int
    fullName: String
    id: Int
    initials: String
    isConfirmed: Boolean
    isExceedingPrivateConnectionsLimit: Boolean
    isLifetimePremium: Boolean
    isPendingConfirmation: Boolean
    isPendingReconfirmation: Boolean
    isPremium: Boolean
    isSupporter: Boolean
    lastName: String
    metadata: Metadata
    profileId: Int
    slug: String
    username: String
  }

  type UserAvatarImage {
    thumb: String
    display: String
  }

  type AllUsersMeta {
    currentPage: Int
    totalPages: Int
  }

  type Attatchment {
    contentType: String
    extension: String
    fileName: String
    fileSize: Int
    fileSizeDisplay: String
    url: String
  }

  type Metadata {
    description: String
  }

  type Image {
    url: String
    file_size: Int
    file_size_display: String
  }

  type Manifest {
    AWSAccessKeyId: String
    acl: String
    bucket: String
    expires: String
    key: String
    policy: String
    signature: String
    success_action_status: String
  }

  enum State {
    available
    failure
    processed
    processing
  }

  enum Status {
    public
    closed
    private
  }

  input CreateChannelInput {
    title: String!
    status: Status
  }

  input CreateBlockInput {
    channelSlug: String!
    source: String
    content: String
  }
`;

module.exports = { typeDefs };
