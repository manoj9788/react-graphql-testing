const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const { tracing, fieldResolver } = require('easygraphql-tracing');


const app = express();
app.use(tracing)

//middleWare
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-cmmr3.mongodb.net/test?retryWrites=true&w=majority`);
mongoose.connection.once('open', () => {
    console.log('Connected to mLab cloud database')
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    fieldResolver
}));

//App to listen to port
app.listen(4040,() => {
console.log('Listening for requests on port 4040');
})