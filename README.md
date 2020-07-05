# are.na GraphQP server

> Note: This is still very much a WIP

A GraphQL schema and server wrapping the are.na REST API. The GraphQL schema can be found [here](./src/type-defs.js)

## Getting Started

1. Clone the repository

```sh
git clone git@github.com:jordanoverbye/are.na-graphql.git
```

2. Install dependencies

```
yarn
```

3. Start the development server

```
yarn dev
```

You should now have the GraphQL playground running at `http://localhost:4000`

## Queries

Query all Channels

```graphql
{
  # Queries related to channels
  allChannels(page: 2, size: 50, search: "Poster") {
    id
    title
  }

  _allChannelsMeta(page: 2, size: 50, search: "Poster") {
    currentPage
    totalPages
  }

  Channel(slug: "a-channel-slug") {
    id
    title
  }

  # Queries related to blocks
  allBlocks(page: 2, size: 50, search: "Code") {
    id
    title
  }

  _allBlocksMeta(page: 2, size: 50, search: "Code") {
    currentPage
    totalPages
  }

  Block(id: 100) {
    id
    title
  }

  # Queries related to users
  allUsers(page: 1, size: 20, search: "Jordan") {
    id
    firstName
    fullName
  }

  _allUsersMeta(page: 1, size: 20, search: "Jordan") {
    currentPage
    totalPages
  }

  User(id: 100) {
    id
    firstName
  }
}
```

## Mutations

```graphql
mutation {
  createChannel(data: {
    title: "Hello World",
    status: private
  }) {
    id
  }

  createBlock(data: {
    channelSlug: "hello-world".
    source: "http://google.com"
  }) {
    id
  }
}
```

## Authorisation

In order to access private resources and perform mutations, you can add arena personal access tokens to the `Authorization` HTTP headers using the `Bearer` scheme. However, this is not required to perform queries on public channels/blocks.
