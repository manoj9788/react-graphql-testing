const supertest = require("supertest");
const expect = require("chai").expect;
const schema = require("../schema/schema");

let baseURL = supertest("http://localhost:4040/graphql");
let list_users = `{
    movie(id:"5ec2caaaa0f98451a25d1429") {
      name
      id
      actor {
        name
        age
        id
      }
    }
  }
  `;
describe("POST Request", async () => {
  let post_resp;
  it("makes a POST call ", async () => {
    post_resp = await baseURL
      .post(list_users);
    await console.log(post_resp.body);
  });
});
