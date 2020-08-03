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
const PORT = process.env.PORT || 4001;

//MIDDLEWARE
app.use(
  //MORGAN
  morgan("tiny"),
  //JSON BODY PARSER
  bodyParser.json(),
  //URL ENDCONDED BODY PARSER
  bodyParser.urlencoded({ extended: false }),
  ("/quotes", quotes)
);

if(process.env.NODE_ENV==="production"){
  app.use(express.static("public"))
}


app.listen(PORT, () => {
  console.log(`... currently listening on port ${PORT}`);
});
