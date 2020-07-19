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
  });
  describe("/quotes", () => {
    describe("GET", () => {
      it("Will match the object in the GET quotes, to verify response", async () => {
        //Makes http request to GET '/quotes'
        await chai
          .request("http://localhost:4001")
          .get("/quotes")
          .then((response) => {
            const allQuotes = response.body.allObjects;
            let quotes = "";
            allQuotes.forEach((obj) => {
              quotes += `${obj.quote} ${obj.author} ${obj.source}`;
            });
            assert.include(quotes, "Testing");
            assert.include(quotes, "Author");
            assert.include(quotes, "Source");
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
            const createdQuote = response.body.createdObject;
            //assert the response matches the status code and the original quote
            assert.equal(response.status, 201);
            assert.isTrue(createdQuote.quote === quote.quote);
            assert.isTrue(createdQuote.author === quote.author);
            assert.isTrue(createdQuote.source === quote.source);
            //Following POST, another GET will be sent
            await chai
              .request("http://localhost:4001")
              .get("/quotes")
              //The response will be converted to a string
              .then((response) => {
                const allQuotes = response.body.allObjects;
                let quotesString = "";
                //Creates a temp string of all quotes
                allQuotes.forEach((obj) => {
                  quotesString += `${obj.quote} ${obj.author} ${obj.source}`;
                });
                //verifies if any of the objects include the object type
                assert.isTrue(quotesString.includes(quote.quote));
                assert.isTrue(quotesString.includes(quote.author));
                assert.isTrue(quotesString.includes(quote.source));
                assert.strictEqual(response.status, 200);
              })
              .catch((error) => {
                throw error;
              });
          })
          .catch((error) => {
            throw error;
          });
      });
    });
  });

  describe("GET:id", () => {
    it("Should obtain id and use the id to retrive object by using id", async () => {
      const quote = "Test";
      let objId = "";
      await chai
        .request("http://localhost:4001")
        .get("/quotes")
        .then((response) => {
          const allQuotes = response.body.allObjects;
          allQuotes.forEach((obj) => {
            if (obj.quote === quote) {
              objId = obj._id;
              assert.equal(obj._id, objId);
            }
          });
        })
        .catch((error) => {
          throw error;
        });
      //With the saved id a query will be made
      await chai
        .request("http://localhost:4001")
        .get("/quotes/" + objId)
        .then((response) => {
          //Only if equal
          const foundQuote = response.body.existingObject.quote;
          assert.strictEqual(foundQuote, quote);
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe("DELETE:id", () => {
    it("Should obtain quote id and delete it", async () => {
      const quote = "Test Delete";
      let objId = "";
      await chai
        .request("http://localhost:4001")
        .get("/quotes")
        .then((response) => {
          const allQuotes = response.body.allObjects;
          allQuotes.forEach((obj) => {
            if (obj.quote === quote) {
              objId = obj._id;
              assert.equal(obj._id, objId);
              console.log(objId);
            }
          });
        })
        .catch((error) => {
          throw error;
        });
      //With the saved id a query will be made
      await chai
        .request("http://localhost:4001")
        .delete("/quotes/" + objId)
        .then((response) => {
          console.log(response.body);
          const deletedID = response.body.deletedObject._id;
          const deletedMessage = response.body.message;
          const message = "Successfully deleted Object";
          assert.strictEqual(message, deletedMessage);
          assert.equal(deletedID, objId);
        })
        .catch((error) => {
          throw error;
        });
    });
  });
  describe("PUT:id", () => {
    it("Should obtain quote id and delete it", async () => {
      const quote = "Test Update";
      const author = "Test Update Author";
      let objId = "";
      await chai
        .request("http://localhost:4001")
        .get("/quotes/")
        .then((response) => {
          const allQuotes = response.body.allObjects;
          allQuotes.forEach((obj) => {
            if (obj.quote === quote) {
              objId = obj._id;
            }
          });
        })
        .catch((error) => {
          throw error;
        });
      await chai
        .request("http://localhost:4001")
        .put("/quotes/" + objId)
        .type("form")
        .send({ author: updatedAuthor })
        .then((response) => {
          const updatedMessage = response.body.message;
          const updatedAuthor = response.body.updatedObject.author;
          const updatedQuoteId = response.body.updatedObject._id;
          const message = "Successfully updated Object"
          assert.equal(message, updatedMessage)
          assert.equal(author, updateAuthor);
          assert.equal(objId, updatedQuoteId);
        });
    });
  });
});
