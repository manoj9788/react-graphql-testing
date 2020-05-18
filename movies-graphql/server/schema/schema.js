const graphql = require('graphql');
const _ = require('lodash')
const {GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

var movies = [
  {name: 'The Matrix', genre: 'Sci-Fi', id: '1'},
  {name: 'Inception', genre: 'Sci-Fi', id: '2'},
  {name: 'The Conjuring', genre: 'Horror', id: '3'},
  {name: 'Wonder Woman', genre: 'Action', id: '4'}
];

var actors = [
    {name: 'Keanu Reeves', age: '55', id: '1'},
    {name: 'Leonardo DiCaprio', age: '45', id: '2'},
    {name: 'Vera Farmiga', age: '46', id: '3'},
    {name: 'Gal Gadot', age: '35', id: '4'}
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});


const ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //Code to get data from db or datastructure
                console.log(typeof(args.id));
                return _.find(movies, {id: args.id});

            }
        },
        actor: {
            type: ActorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                console.log(typeof(args.id));
                return _.find(actors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});