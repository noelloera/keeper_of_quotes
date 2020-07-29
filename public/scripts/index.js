//Since the elements are assigned outside the event no values are assigned
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const source = document.getElementById("source");
const form = document.getElementById("form");
const allQuotes = document.getElementById("quotes");
const warning = document.getElementById("warning")

//Buttons
const submit = document.getElementById("submit");
const edit = document.getElementById("edit");
const remove = document.getElementById("remove");

//Hidden by default

//Button behavior
submit.addEventListener("click", async (e) => {
  e.preventDefault();
  if (quote.value && author.value && source.value) {
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
    console.log(quote, source, author);
    alert("Submitted new Quote!")
    window.location = "/";
  }else{
    warning.style.display = "block"
  }
});

edit.addEventListener("click", (e) => {
  e.preventDefault();
});
remove.addEventListener("click", (e) => {
  e.preventDefault();
});

//Maps the Objects from the server
async function getQuotes() {
  let response = await (await fetch("/quotes")).json();
  document.body.allObjects = response.allObjects;
  allQuotes.innerHTML = response.allObjects
    .map((obj, i) => {
      return `<div id=${i}>
      Quote: ${obj.quote}
      Author: ${obj.author}
      Source: ${obj.source}
      </div>`;
    })
    .join("");
}

async function runAll() {
  await getQuotes();
}
runAll();

//Loads quote to Edit when clicked
allQuotes.addEventListener("click", async (e) => {
  e.preventDefault();
  //change submit
});

//This the submit form eventListener
/*
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
*/
