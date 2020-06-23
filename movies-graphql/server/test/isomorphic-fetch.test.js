  
  var fetch = require('isomorphic-fetch');

  fetch('http://localhost:4040/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ movies { name, genre } }' }),
  })
    .then(response => response.json())
    .then(response => console.log(response.data));





