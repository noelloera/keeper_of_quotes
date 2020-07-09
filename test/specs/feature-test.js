const { assert } = require("chai");
const fs = require("fs");

//If this does not work try checking the WebDriver IO CLI

//This is the feature testing when a user will visit the root
describe("The applications features exist and work correctly", () => {
  const filepath =
  "file:///Users/noel/Documents/WebDesignProjects/quote_keeper/public/index.html";
  beforeEach(()=>{
    browser.url(filepath);
  })
  
  const quote = "All types of knowledge, ultimately mean self knowledge.";
  const author = "Bruce Lee";
  const source = "The Lost Interview (1971)";
  //Saves the element queries into accesible variables
  const quoteElem = $("#quote");
  const authorElem = $("#author");
  const sourceElem = $("#source");
  const buttonElem = $("#submit");
  const allQuotesElem = $("#quotes");
  
  //Verifies that the application loads when being accessing html file
  describe("The application loads the file for live view", () => {
    it("Should load when seeing live view", () => {
      //Will verify that the filepath is not false
      try {
        if (fs.existsSync(filepath)) {
          assert.isOk(true, filepath);
        }
      } catch {
        error;
        console.log(error);
      }
    });
  });
  //Verifies that the application contains the elements it should
  describe("The application loads the elements", () => {
    beforeEach(()=>{
      browser.url(filepath);
    })
    const quote = "All types of knowledge, ultimately mean self knowledge.";
    const author = "Bruce Lee";
    const source = "The Lost Interview (1971)";
    //Saves the element queries into accesible variables
    const quoteElem = $("#quote");
    const authorElem = $("#author");
    const sourceElem = $("#source");
    const buttonElem = $("#submit");
    const allQuotesElem = $("#quotes");
    it("Should contain all the elements references", () => {
      if ((quoteElem, authorElem, sourceElem, buttonElem, allQuotesElem)) {
        assert.isTrue(true, quoteElem);
        assert.isTrue(true, authorElem);
        assert.isTrue(true, sourceElem);
        assert.isTrue(true, buttonElem);
        assert.isTrue(true, allQuotesElem);
      } else {
        console.log("The values do not exist");
      }
    });
    it("Should add values to the input fields", () => {
      console.log(quoteElem)

    });
    it("Should click the submit button and expect for quote to be posted", () => {});
  });

  //This will test functionality when a Quote is submitted
  describe("User Inputs information ", () => {
    it("Should POST the Quote and meta to the database", () => {
      //EXCERCISE
      //Directs browser to travel to the root file
      browser.url("http://localhost:5500/");
      //Sets the value of the textarea and input elements with corresponding values
      quoteElem.addValue(quote);
      authorElem.addValue(author);
      sourceElem.addValue(source);
      //Mimics a user click on a submit input element
      buttonElem.click();
      //VERIFY
      //This will esure that the values match the desired values with assertions where all "quotes" should appear
      const quotes = allQuotesElem.getText();
      assert.include(quotes, quote);
      assert.include(quotes, author);
      assert.include(quotes, source);
    });
  });
});
