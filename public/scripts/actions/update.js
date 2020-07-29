export default async function updateEvent(e) {
  e.preventDefault();
  try {
    let selectedQuote = document.body.selectedQuote;
    if (quote.value && author.value && source.value) {
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
      const response = await fetch("quotes/" + selectedQuote._id, options);
      alert("Updated Existing Quote " + selectedQuote._id);
      window.location = "/";
    } else {
      warning.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}
