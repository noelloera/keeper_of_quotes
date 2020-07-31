export default async function deleteEvent(e) {
  e.preventDefault();
  try {
    let selectedQuote = document.body.selectedQuote;
    if (
      quote.value &&
      author.value &&
      source.value &&
      selectedQuote._id !== ""
    ) {
      const options = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("quotes/" + selectedQuote._id, options);
      console.log(response.json());
      alert("Deleted Quote successfully");
      window.location = "/";
    } else {
      warning.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}
