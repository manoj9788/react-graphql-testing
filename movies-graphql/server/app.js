const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

//middleWare
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

//App to listen to port
app.listen(4040,() => {
console.log('Listening for requests on port 4040');
})