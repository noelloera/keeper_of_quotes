const {assert} = require('chai');
const fetch = require('node-fetch');


//This will test the server responses to the requests
describe("/", ()=>{
    describe("GET", ()=>{
        it("Will recieve a status code of 200", async()=>{
            await browser.call(async =>{ 
                let response = await fetch('http://localhost:4001/')
                let data = await response.json();
                console.log(response.status);
                assert.equal(response.status, 200);
            })
        })
    })
    //This function needs to be asynchronous because it will perform actions in the browser
    describe("POST", ()=>{
        it("Will take the inputs and create a new quote in the textarea", async()=>{
            //Imitation input variables containing strings for POST
            const quote = "If one loves, one need not to have an ideology of love";
            const author =  "Bruce Lee";
            const source = "The Warrior Within";
            //Attempt to make a POST request to the root of the page
            //Separate the body of information being sent
            const data = {quote, author, source};
            //When making a fetch request it's wise to separate the options
            let options ={
                method: 'POST',
                body: JSON.stringify(data)
            }
            let response = await fetch('http://localhost:4001/', options)
            assert.include(response.text, quote);        
        })
    })
})
