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
        const response = await fetch("quotes", options);
        if(response){
          alert("Submitted A New Quote!")
          window.location = "/"
        }else{
          throw error;
        }
      } else {
        warning.style.display = "block";
      }
    } catch (error) {
      console.log(error)
    } 
}

