const graphql = require('graphql');
const _ = require('lodash')
const {GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

var movies = [
  {name: 'The Matrix', genre: 'Sci-Fi', id: '1', actorId: '1'},
  {name: 'John Wick', genre: 'Action', id: '2', actorId: '1'},
  {name: 'Inception', genre: 'Sci-Fi', id: '3', actorId: '2'},  
  {name: 'Titanic', genre: 'Romantic', id: '4', actorId: '2'},
  {name: 'The Conjuring', genre: 'Horror', id: '5', actorId: '3'},
  {name: 'Wonder Woman', genre: 'Action', id: '6', actorId: '4'}
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
        genre: {type: GraphQLString},
        actor: {
            type: ActorType,
                resolve(parent, args){
                    console.log(parent)
                    //from actors array - find actor whose Id property which matches
                    //parent which is the movie(parent)
                    return _.find(actors, {id: parent.actorId});
                }
            }
    })  
});


const ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                //filter through movies array and show us
                //the matching fields matching ids
                return _.filter(movies, {actorId: parent.id});
            }
        }
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
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies;
            }
        },
        actors: {
            type: new GraphQLList(ActorType),
            resolve(parent, args){
                return actors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});