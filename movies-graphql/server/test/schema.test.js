const fs = require("fs");
const path = require("path");
const EasyGraphQLTester = require("easygraphql-tester");
const mocha = require("mocha");
const { graphql } = require("graphql");
var expect = require("chai").expect;
var util = require("util");

const schemaCode = fs.readFileSync(
  path.join("./schema/movies-schema.gql"),
  "utf8"
);

describe("Test Schema, Queries and Mutation", () => {
  let tester;

  before(() => {
    tester = new EasyGraphQLTester(schemaCode);
    //just to make sure schema comes through swiftly
    //console.log(util.inspect(tester))

    console.log("=========== Tests Started ===========");
  });

  after(() => {
    console.log("=========== Tests Finished ===========");
  });

  // ********************** TESTING SCHEMA **********************

  describe("Testing Schema", () => {
    it("Should pass with a valid query", () => {
      const query = `
      {
        movies {
          name
          genre
          actor{
            name
            age
          }
        }
      }      
      `;
      // First arg: true because the query is valid
      // Second arg: query to test
      tester.test(true, query);
    });

    it("Should fail with a Invalid query", () => {
      const query = `
      {
        movies {
          name
          gere
          actor{
            name
            age
          }
        }
      }      
      `;
      // First arg: false because the query is valid
      // Second arg: query to test
      tester.test(false, query);
    });
  });

  describe("Test schema queries Scenarios", () => {
    let tester;

    before(() => {
      tester = new EasyGraphQLTester(schemaCode);
    });

    // ********************** TESTING SCHEMA QUERIES**********************

    it("Should pass with a valid movie query", () => {
      const query = `
      {
        movie(id:"2343243242343243242"){
          name
          genre
          actor{
            name
          }
        }
      }      
      `;
      // First arg: true because the query is valid
      // Second arg: query to test
      tester.test(true, query);
    });
  });

  describe("Test Mutations scenarios", () => {
    let tester;

    before(() => {
      tester = new EasyGraphQLTester(schemaCode);
    });

    // ********************** TESTING MUTATIONS **********************

    it("Should pass with a valid mutation query", () => {
      const mutation = `
      mutation addMovie($id: String!, $name: String!, $genre: String) {
        addMovie(id: $id, name: $name, genre: $genre) {
            id
            name
            genre
        }
      }      
      `;
      // First arg: true because the query is valid
      // Second arg: query to test
      tester.test(true, mutation, {
        id: "some id",
        name: "testMovie",
        genre: "Action",
      });
    });

    it("Should fail with a Invalid mutation query", () => {
      const mutation = `
      mutation addMovie($id: String!, $name: String!, $genre: String) {
        addMovie(id: $id, name: $name, genre: $genre) {
            id
            name
            genre
        }
      }      
      `;
      // First arg: false because the query is Invalid
      // Second arg: query to test
      tester.test(false, mutation, {
        id: 23,
        name: "testMovie",
        genre: "Action",
      });
    });
  });
});
