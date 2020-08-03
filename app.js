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
const PORT = process.env.PROXIMO_URL || 4001;

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
}


server.listen(PORT,'127.0.0.1',function(){
  server.close(function(){
    server.listen(PORT,'192.168.0.202')
  })
 })
/*
app.listen(PORT, "174.129.240.180", () => {
  console.log(`... currently listening on port ${PORT}`);
});*/
