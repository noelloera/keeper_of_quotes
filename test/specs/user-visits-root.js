const {assert} = require('chai');

/*
describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url('https://webdriver.io')
        const title = browser.getTitle()
        expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    })
})
*/

//If this does not work try checking the WebDriver IO CLI

//This is the feature testing when a user will visit the root
describe("User Enters Root",()=>{

    //This will test functionality when a Quote is submitted
    describe("User Posts a Quote", ()=>{
        it("Should POST the Quote and meta to the database", ()=>{
            //SETUP
            //Inside the it block, you attempt to mimic user input
            const quote = "All types of knowledge, ultimately mean self knowledge.";
            const author = "Bruce Lee";
            const source = "The Lost Interview (1971)";
            //Saves the element queries into accesible variables
            const quoteElem = $('#quote');
            const authorElem = $('#author');
            const sourceElem = $('#source');
            const buttonElem = $('#submit');
            const allQuotesElem = $('#quotes')
            //EXCERCISE
            //Directs browser to travel to the root file
            browser.url('http://localhost:4001/');
            //Sets the value of the textarea and input elements with corresponding values
            quoteElem.addValue(quote);
            authorElem.addValue(author);
            sourceElem.addValue(source);
            //Mimics a user click on a submit input element
            buttonElem.click();
            //VERIFY
            //This will esure that the values match the desired values with assertions where all "quotes" should appear
            /*
            const quotes = allQuotesElem.getText();
            assert.include(quotes, quote);
            assert.include(quotes, author);
            assert.include(quotes, source);
        })
    })
})
