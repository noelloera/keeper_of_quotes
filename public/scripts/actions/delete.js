export default async function deleteEvent(e) {
  e.preventDefault();
  try {
    let selectedQuote = document.body.selectedQuote;
    //Checks if the values are entered and selected exists
    if (
      quote.value &&
      author.value &&
      source.value &&
      selectedQuote&&
      selectedQuote._id !== ""
    ) {
      const options = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      let response = await fetch("quotes/" + selectedQuote._id, options);
      if(response){
        alert("Deleted Quote successfully");
        window.location = "/";
      }
      else{
        throw error;
      }
    } else {
      warning.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}
