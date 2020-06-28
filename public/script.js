//Since the elements are assigned outside the event no values are assigned
const quote = document.getElementById("quote")
const author = document.getElementById("author")
const source = document.getElementById("source")
const form = document.getElementById("form")
const allQuotes = document.getElementById("quotes");

console.log("inside the js");

fetch('http://localhost:4001/quotes')
.then(response =>{
    response.json();
})
.catch(error=>{
    throw error;
})

//This is the event listener function that runs when form submits
/*form.addEventListener('submit', e =>{
    e.preventDefault();
    //Statement checks if the input values are truthy
    if(quote && author && source){
        const fullQuote = {
            quote: quote.value, 
            author: author.value, 
            source: source.value}
    //Checls the inputs are being saved
        const fullQuoteArray = Object.values(fullQuote);
        for(var i=0; i<fullQuoteArray.length; i++){
            console.log(fullQuoteArray[i]);
    }
        //Since the object with the values is already created, you can make a post request
        //XMLHttpRequest
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:4001/", true)
        //This is required if the HTTP call is a XML POST
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(`quote=${fullQuote.quote}&author=${fullQuote.author}&source=${fullQuote.source}`);
        /*request.onload = () =>{
            if(request.status === 200)
    
    }
}})*/