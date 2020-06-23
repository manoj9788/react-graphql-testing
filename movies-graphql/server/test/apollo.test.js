const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'https://n7b67.sse.codesandbox.io/graphql',
});

// You can also easily pass variables for dynamic arguments
fetch({
  query: `{
    movie(id:"5ec2caaaa0f98451a25d1429") {
      name
      id
      actor {
        name
        age
        id
      }
    }
  }`,
  variables: { id: 1 },
}).then(res => {
  console.log(res.data);
});