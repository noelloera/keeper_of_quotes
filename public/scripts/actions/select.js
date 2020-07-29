const allQuotes = document.getElementById("quotes");

allQuotes.addEventListener("click", async function (e) {
  e.preventDefault();
  //change submit
  try {
    let quoteId = e.target.id;
    let quoteObjects = document.body.allObjects;
    let selectedQuote = quoteObjects[quoteId];
    document.body.selectedQuote = selectedQuote;
    if (selectedQuote.quote && selectedQuote.author && selectedQuote.source) {
      console.log(selectedQuote)
      quote.value = selectedQuote.quote;
      author.value = selectedQuote.author;
      source.value = selectedQuote.source;
      submit.style.display = "none";
      update.style.display = "block";
      remove.style.display = "block";
      document.body.selectedQuote = selectedQuote;
    } else {
      alert("Corrupted Quote Object");
    }
  } catch (error) {
    console.log(error);
  }
});

