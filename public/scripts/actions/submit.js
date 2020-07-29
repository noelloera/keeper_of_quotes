export default async function submitEvent(e){
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
}

