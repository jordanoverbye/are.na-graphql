# \*\* are.na-graphql

A GraphQL wrapper around the are.na REST API. Built with [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

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

You should now have the server running at `http://localhost:4000`

## Queries

Query all Channels

```graphql
{
  allChannels(page: 2, size: 50, search: "Poster") {
    id
    title
    ...etc
  }

  _allChannelsMeta(page: 2, size: 50, search: "Poster") {
    currentPage: 2
    totalPages: 18
  }

  Channel(slug: "a-channel-slug") {
    id
    title
    ...etc
  }
}
```

Query all Blocks

```graphql
{
  allBlocks(page: 2, size: 50, search: "Code") {
    id
    title
    ...etc
  }

  _allBlocksMeta(page: 2, size: 50, search: "Code") {
    currentPage: 2
    totalPages: 18
  }

  Block(id: 100) {
    id
    title
    ...etc
  }
}
```

Query Users

```
{
  allUsers(page: 1, size: 20, search: "Jordan") {
    id
    firstName
    fullName
    ... etc
  }

  _allUsersMeta(page: 1, size: 20, search: "Jordan") {
    currentPage: 2
    totalPages: 18
  }

  User(id: 100) {
    id
    firstName
    etc
  }
}
```

## Mutations

Todo
