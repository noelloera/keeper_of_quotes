//Elements
//Event Modules
import submitEvent from "./actions/submit.js";
import updateEvent from "./actions/update.js";
import deleteEvent from "./actions/delete.js";
import getQuotes from "./actions/getQuotes.js";
//Quotes element from the DOM
const allQuotes = document.getElementById("quotes");
//Buttons
const submit = document.getElementById("submit");
const update = document.getElementById("update");
const remove = document.getElementById("remove");

getQuotes(allQuotes);
//SUBMIT
submit.addEventListener("click", submitEvent);
//allQuotes.addEventListener("click", selectEvent)
if (update) update.addEventListener("click", updateEvent);
if (remove) remove.addEventListener("click", deleteEvent);
