const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express();

//middleWare
mongoose.connect('mongodb+srv://test1234:test1234@cluster0-cmmr3.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to mLab cloud database')
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

//App to listen to port
app.listen(4040,() => {
console.log('Listening for requests on port 4040');
})