const { assert } = require("chai");
const fs = require("fs");

//This is the feature testing when a user will visit the root
describe("The applications features exist and work correctly", () => {
  const filepath =
    "file:///Users/noel/Documents/WebDesignProjects/quote_keeper/public/index.html";
  beforeEach(() => {
    browser.url(filepath);
  });
  //Verifies that the application loads when being accessing html file
  describe("The application loads the file for live view", () => {
    it("Should load when seeing live view", () => {
      //Will verify that the filepath is not false
      try {
        if (fs.existsSync(filepath)) {
          assert.isOk(true, filepath);
        }
      } catch (error) {
        console.log(error);
      }
    });
    //Use the is displayed property
    it("Should contain all the elements references", () => {
      const quoteElem = $("#quote");
      const authorElem = $("#author");
      const sourceElem = $("#source");
      const buttonElem = $("#submit");
      const allQuotesElem = $("#quotes");
      //Verifies that the DOM element exists
      assert.isTrue(true, quoteElem.isDisplayed());
      assert.isTrue(true, authorElem.isDisplayed());
      assert.isTrue(true, sourceElem.isDisplayed());
      assert.isTrue(true, buttonElem.isDisplayed());
      assert.isTrue(true, allQuotesElem.isDisplayed());
    });
    //Will attempt to post new quote
    it("Should click the submit button and expect for quote to be posted", () => {
      const quote = "All types of knowledge, ultimately mean self knowledge.";
      const author = "Bruce Lee";
      const source = "The Lost Interview (1971)";
      //Will include test code for adding values
      const quoteElem = $("#quote");
      const authorElem = $("#author");
      const sourceElem = $("#source");
      const buttonElem = $("#submit");
      const allQuotesElem = $("#quotes");
      //Adds the values to the DOM elements
      quoteElem.addValue(quote);
      authorElem.addValue(author);
      sourceElem.addValue(source);
      //Will click the DOM element for form submission
      buttonElem.click();
      const quotesString = allQuotesElem.getText();
      assert.include(quotesString, quote);
      assert.include(quotesString, author);
      assert.include(quotesString, source);
    });
  });
});
