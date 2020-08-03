//Express
const express = require("express");
const app = express();
//Middleware
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//Routes
const quotes = require("./routes/quotes");
//PORT
const PORT = process.env.PORT || "8000";

//MIDDLEWARE
app.use(
  //MORGAN
  morgan("tiny"),
  //STATIC PUBLIC DIRECTORY
  express.static("public"),
  //JSON BODY PARSER
  bodyParser.json(),
  //URL ENDCONDED BODY PARSER
  bodyParser.urlencoded({ extended: false }),
  ("/quotes", quotes)
);

//GET ROOT PAGE
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "index.html"));
  res.status(200);
});


app.listen(PORT, () => {
  console.log(`... currently listening on port ${PORT}`);
});
