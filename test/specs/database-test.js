const chai = require("chai");
const assert = chai.assert;
//DB
const Quote = require("../../models/quote.js");
const { connect, disconnect } = require("../../database/database.js");

describe("Database", () => {
  beforeEach(async () => {
    connect();
  });
  afterEach(async () => {
    disconnect();
  });
  describe("Finds All", () => {
    it("Will check if returned is an object", () => {
      Quote.find((error, quotes) => {
        if (error) {
          throw error;
        } else {
          console.log(quotes);
          assert.isObject(quotes);
        }
      });
    });
  });
});
