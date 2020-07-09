//Since the elements are assigned outside the event no values are assigned
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const source = document.getElementById("source");
const form = document.getElementById("form");
const allQuotes = document.getElementById("quotes");

//It is not proper to make requests to the currently running server
//You should aim to make all the variables accessible the server
async function getQuotes() {
  let response = await (await fetch("/quotes")).json()
  response.map(await function (obj, i) {
    allQuotes.innerText += `\n${obj.quote} \n${obj.author} \n${obj.source}\n`;
  })
}
async function runAll() {
  await getQuotes();
}
runAll();


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
    const raw = await fetch("quotes", options);
    const content = await raw.json();
    window.location = "/";
    console.log(content);
  }
});

