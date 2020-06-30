//Since the elements are assigned outside the event no values are assigned
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const source = document.getElementById("source");
const form = document.getElementById("form");
const allQuotes = document.getElementById("quotes");

//Async function that renders quotes
async function getQuotes() {
  let get = await fetch("http://localhost:4001/quotes")
  let response = await get.json();
  let quotes = "";
  response.forEach(obj => {
    quotes += `\n${obj.quote} \n${obj.author} \n${obj.source}\n`
  })
  allQuotes.innerText = quotes;
  console.log(quotes);
}

//Runs the async functions
async function run() {
  await getQuotes();
}
//Runs the asynchronous queue
run();

//This the submit form eventListener
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (quote && author && source) {
    let fullQuote = {
      quote: quote.value,
      author: author.value,
      source: source.value,
    };
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullQuote),
    };
    const raw = await fetch("http://localhost:4001/quotes", options);
    const content = await raw.json();
    window.location = "http://localhost:4001/";
    console.log(content);
  }
});

