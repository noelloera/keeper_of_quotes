//Since the elements are assigned outside the event no values are assigned
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const source = document.getElementById("source");
const form = document.getElementById("form");
const allQuotes = document.getElementById("quotes");

//Maps the Objects from the server
async function getQuotes() {
  let response = await (await fetch("/quotes")).json();
  allQuotes.innerHTML = response.allObjects.map(obj => {
    return `<div id=${obj._id}>
      <p>Quote: ${obj.quote}</p>
      <p>Author: ${obj.author}</p>
      <p>Source: ${obj.source}</p>
      </div>`
  }).join('');
}

async function runAll() {
  await getQuotes();
}
runAll();

allQuotes.addEventListener("click", async (e) => {
  e.preventDefault();

})


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
