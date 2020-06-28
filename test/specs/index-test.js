const chai = require("chai");
const fetch = require("node-fetch");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHttp);

//This will test the server responses to the requests
describe("/", () => {
  describe("GET", () => {
    //Server makes a request and recieves a code of 200 'root'\
    it("Will recieve a status code of 200", async () => {
      //Makes http request to GET '/'
      await chai
        .request("http://localhost:4001")
        .get("/")
        //This will only catch the error if it is thrown
        .then((response) => {
          assert.equal(response.status, 200);
        })
        .catch((error) => {
          throw error;
        });
    });
  });
  describe("GET", () => {
    it("Will match the object in the GET quotes", async () => {
      //Makes http request to GET '/quotes'
      await chai
        .request("http://localhost:4001")
        .get("/quotes")
        .then((response) => {
          const body = response.body;
          let quotes = "";
          body.forEach((obj) => {
            quotes += `${obj.quote} ${obj.author} ${obj.source}`;
          });
          assert.include(quotes, "First Quote");
          assert.include(quotes, "First Author");
          assert.include(quotes, "First Source");
          assert.equal(response.status, 200);
        })
        .catch((error) => {
          throw error;
        });
    });
  });
  //This function needs to be asynchronous because it will perform actions in the browser
  describe("POST", () => {
    it("Will make POST request to server", async () => {
      //Imitation input variables containing strings for POST
      const quote = {
        quote: "If one loves, one need not to have an ideology of love",
        author: "Bruce Lee",
        source: "The Warrior Within",
      };
      //When making a fetch request it's wise to separate the options
      /*let options ={
                method: 'POST',
                body: JSON.stringify(data)
            }*/
      await chai
        .request("http://localhost:4001")
        .post("/")
        .type("form")
        .send(quote)
        .then((response) => {
          //Will make a temp string holding all the quotes
          const body = response.body;
          console.log(body);
          let quotes = "";
          body.forEach((obj) => {
            quotes += `${obj.quote} ${obj.author} ${obj.source}`;
          });
          //After the stirng of all quotes is made it is asserted to include
          assert.include(quotes, quote.quote);
          assert.include(quotes, quote.author);
          assert.include(quotes, quote.source);
          assert.equal(response.status, 201);
        })
        .catch((error) => {
          throw error;
        });
    });
  });
});
