const HttpLink = require('apollo-link-http').HttpLink;
const fetch = require('node-fetch');
const introspectSchema = require('graphql-tools').introspectSchema;
const { getIntrospectionQuery, buildClientSchema, graphql } = require('graphql')


const link = new HttpLink({
    uri: "https://n7b67.sse.codesandbox.io/graphql?",
    fetch
  });


  module.exports = async function() {
    const schema = await introspectSchema(link);
    return schema;
  }