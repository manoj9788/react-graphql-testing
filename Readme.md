# react-graphql-testing
A template project to demo testing GraphQL server and React Client

A simple system to showcase GraphQL Testing

## Design
![alt text](./movies-graphql/images/arch.png)

## Server

A repository contains a list of movies with couple of data fields using GraphQL to expose the endpoints

![alt text](./movies-graphql/images/graphiql.png)

### Testing GraphQL
The most exciting part, the tests for the GraphQL endpoints are added for,

* Schema
* Queries
* Mutation

All the tests can be found [here](./movies-graphql/server/test/schema.test.js)

## Client

A React app for us to interact with the endpoints

To-do