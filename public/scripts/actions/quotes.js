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
        <h1 style="pointer-events:none">Quote: ${obj.quote}</h1>
        <h6 style="pointer-events:none">Author: ${obj.author}</h6>
        <h6 style="pointer-events:none">Source: ${obj.source}</h6>
        </div>`;
        })
        .join("");
    }
  } catch (error) {
    console.log(error);
  }
}
