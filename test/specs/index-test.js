const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;

//Will allow plugin to be used in Chai
chai.use(chaiHttp);

//This will test the server responses to the requests
describe("/", () => {
  describe("GET", () => {
    //Server makes a request and recieves a code of 200 'root'\
    it("Will recieve a status code of 200, for the root page", async () => {
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
  })
  describe("/quotes", () => {
    describe("GET", () => {
      it("Will match the object in the GET quotes, to verify response", async () => {
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
      it("Will make POST request to server, and check new quote exists", async () => {
        //Imitation input variables containing strings for POST
        const quote = {
          quote: "If one loves, one need not to have an ideology of love",
          author: "Bruce Lee",
          source: "The Warrior Within",
        };
        //When making a fetch request it's wise to separate the options
        await chai
          .request("http://localhost:4001")
          .post("/quotes")
          .type("form")
          .send(quote)
          .then(async (response) => {
            const id = response.body.id;
            //Following POST, another GET will be sent
            await chai
              .request("http://localhost:4001")
              .get("/quotes")
              //The response will be converted to a string
              .then(response => {
                const body = response.body;
                console.log(body);
                let quotes = "";
                //Creates a temp string which matches the contents based on response id
                body.forEach(obj => {
                  if (obj.id == id) {
                    console.log(obj.id)
                    //Only if the obj id and the response id match will it assert
                    quotes += `${obj.quote} ${obj.author} ${obj.source}`; //The string will be asserted to include the posted quote
                    assert.include(quotes, quote.quote);
                    assert.include(quotes, quote.author);
                    assert.include(quotes, quote.source);
                    assert.equal(obj.id, id);
                  }
                })
                //The assert will verify the GET 200 status
                assert.equal(response.status, 200);
              })
              .catch(error=>{
                throw error;
              })
              //The assert will verify the POST 201 status
              assert.equal(response.status, 201);
          })
          .catch((error) => {
            throw error;
          })

      })
    });
  });
});
