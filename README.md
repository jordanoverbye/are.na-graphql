# are.na GraphQP server

> Note: This is still a WIP

A GraphQL schema and server wrapping the are.na REST API.


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

  # Queries related to 'Channels'
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
  
  # Queries related to 'Blocks'
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
