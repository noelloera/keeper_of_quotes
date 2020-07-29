export default async function getQuotes(allQuotes) {
  try {
    let response = await (await fetch("/quotes")).json();
    if (response) {
      loading.style.display = "none";
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
  } catch (error) {
    console.log(error);
  }
}
