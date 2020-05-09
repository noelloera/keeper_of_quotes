const {assert} = require('chai');
const root = 

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
            //EXCERCISE
            //Directs browser to travel to the root file
            browser.url('/');
            //Sets the value of the textarea and input elements with corresponding values
            browser.setValue('textarea[id=quote]', quote);
            browser.setValue('input[id=author]', author);
            browser.setValue('source[id=source]', source);
            //Mimics a user click on a submit input element
            browser.click('input[type=submit]');
            //VERIFY
            //This will esure that the values match the desired values with assertions where all "quotes" should appear
            const quotes = browser.getText('#quotes');
            assert.include(quotes, quote);
            assert.include(quotes, author);
            assert.include(quotes.source);
        })
    })
})