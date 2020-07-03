const chai = require("chai"); 
const assert = chai.assert;
const chaiHttp = require("chai-http");
const {
    mongoose,
    dbUrl,
    options,
    connect,
    disconnect
} = require("../../database/database")
//const Quote = require("../../models/quote")
chai.use(chaiHttp);

describe("Database", () => {
    //Performs actions before test cases
    beforeEach(async () => {
        //Establish connection to DB to ensure object persistence
        await connect();
    })
    //Performs actions after test cases
    afterEach(async () => {
        await disconnect();
    });
    describe("#quotes", () => {
        it("Will always be a string", async () => {
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