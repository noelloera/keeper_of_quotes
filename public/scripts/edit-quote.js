//Maps the Objects from the server
async function getQuote() {
  let response = await (await fetch("/quotes")).json();
  
  allQuotes.innerHTML = response.allObjects
    .map((obj) => {
      return `<div id=${obj._id}>
        <br>Quote: ${obj.quote}
        <br>Author: ${obj.author}
        <br>Source: ${obj.source}
        </div>`;
    })
    .join("");
}

async function runAll() {
  await getQuotes();
}
runAll();
