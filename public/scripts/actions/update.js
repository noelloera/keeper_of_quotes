export default async function updateEvent(e) {
  e.preventDefault();
  try {
    let selectedQuote = document.body.selectedQuote;
    if (
      quote.value &&
      author.value &&
      source.value &&
      selectedQuote &&
      selectedQuote._id
    ) {
      if (
        quote.value !== selectedQuote.quote ||
        author.value !== selectedQuote.author ||
        source.value !== selectedQuote.source
      ) {
        let fullQuote = {
          quote: quote.value,
          author: author.value,
          source: source.value,
        };
        const options = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullQuote),
        };
        let response = await fetch("quotes/" + selectedQuote._id, options);
        if (response) {
          alert("Updated Existing Quote");
          window.location = "/";
        } else {
          throw error;
        }
      } else {
        alert("No Changes Were Registered! :(");
      }
    } else {
      warning.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}
