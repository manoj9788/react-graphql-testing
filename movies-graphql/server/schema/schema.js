const graphql = require('graphql');
const _ = require('lodash')
const Movie = require('../models/movies');
const Actor = require('../models/actors');

const {GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = graphql;

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
                   return Actor.findById(parent.actorId);
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
               return Movie.find({ actorId: parent.id});
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
                return Movie.findById(args.id);

            }
        },
        actor: {
            type: ActorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                console.log(typeof(args.id));
               return Actor.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return Movie.find({});
            }
        },
        actors: {
            type: new GraphQLList(ActorType),
            resolve(parent, args){
                return Actor.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addActor: {
            type: ActorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let actor = new Actor({
                    name: args.name,
                    age: args.age
                });
                return actor.save();
            }
        },
        addMovie: {
            type: MovieType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                actorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    actorId: args.actorId
                });
                return movie.save();
            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});