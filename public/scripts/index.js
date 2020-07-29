//Since the elements are assigned outside the event no values are assigned
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const source = document.getElementById("source");
const form = document.getElementById("form");
const allQuotes = document.getElementById("quotes");
const warning = document.getElementById("warning");

//Buttons
const submit = document.getElementById("submit");
const update = document.getElementById("update");
const remove = document.getElementById("remove");

//Temp variables
let selectedQuote = "";

//Button behavior
submit.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
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
      alert("Submitted new Quote!");
      window.location = "/";
    } else {
      warning.style.display = "block";
    }
  } catch (error) {
    console.log(error)
  }
});
if (update) {
  update.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      if (quote.value && author.value && source.value) {
        let fullQuote = {
          quote: quote.value,
          author: author.value,
          source: source.value
        }
        const options = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(fullQuote)
        }
        const response = await fetch("quotes/" + selectedQuote._id, options)
        alert("Updated Existing Quote " + selectedQuote._id)
        window.location = "/"
      } else {
        warning.style.display = "block"
      }
    } catch (error) {
      console.log(error)
    }
  });
}

remove.addEventListener("click", (e) => {
  e.preventDefault();
});

//Maps the Objects from the server
async function getQuotes() {
  let response = await (await fetch("/quotes")).json();
  document.body.allObjects = response.allObjects;
  //Renders allQuotes HTML
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

//why does it not run
async function runAll() {
  await getQuotes();
}

runAll();

//Loads quote to Edit when clicked
allQuotes.addEventListener("click", async (e) => {
  e.preventDefault();
  //change submit
  try {
    let quoteId = e.target.id;
    const allQuotes = document.body.allObjects;
    selectedQuote = allQuotes[quoteId]
    if (selectedQuote.quote && selectedQuote.author && selectedQuote.source) {
      quote.value = selectedQuote.quote;
      author.value = selectedQuote.author;
      source.value = selectedQuote.source;
      submit.style.display = "none"
      update.style.display = "block"
      remove.style.display = "block"
    } else {
      alert("Corrupted Quote Object")
    }
  } catch (error) {
    console.log(error)
  }
})


