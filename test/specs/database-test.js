const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
//const Quote = require("../../models/quote")
chai.use(chaiHttp);

describe("Database", () => {
    //Performs actions before test cases
    describe("#quotes Persists", () => {
        it("Will yield all values as strings", async () => {
            const newQuote = {
                quote: 1,
                author: 1,
                source: 1
            }
            await chai
                .request("http://localhost:4001")
                .post("/quotes")
                .type("form")
                .send(newQuote)
                .then(async (response) => {
                    console.log(response.body)
                    const quote = response.body.quote;
                    const author = response.body.author;
                    const source = response.body.source;
                    assert.strictEqual(quote, newQuote.quote.toString());
                    assert.strictEqual(author, newQuote.author.toString())
                    assert.strictEqual(source, newQuote.source.toString())
                })
                .catch(error => {
                    throw error;
                })
        })
        

    })

})