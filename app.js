const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Quote = require("./models/quote");
const mongoose = require("mongoose");
const { connect, disconnect } = require("./database/database");

const PORT = process.env.PORT || 4001;

//middleware bodyParser for app/x-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }));

//middleware bodyParser for app/json requests
app.use(bodyParser.json());

//Middleware for morgan
app.use(morgan("tiny"));

//Middleware for setting static directories
app.use(express.static("public"));

//Establishes connection to the database
//connect();

//Will send the Homepage
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "index.html"));
  res.status(200);
});

//Retrieves all the quotes
app.get("/quotes", (req, res) => {
  Quote.find()
    .exec()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: error });
    });
});

//Allows for a query to DB by quoteID
app.get("/quotes/:quoteId", (req, res, next) => {
  const id = req.params.quoteId;
  //Will sort through the DB to find object by id
  Quote.findById(id)
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).send({
          message: "Successfully found Object",
          existingObject: result,
        });
      } else {
        res.status(404).send({
          warning: "Object not Found",
          message: "Not a valid ID",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
});

//POST Request to quotes
app.post("/quotes", (req, res) => {
  //Request variables//
  const quote = req.body.quote;
  const author = req.body.author;
  const source = req.body.source;
  //Checks if the inputs include values
  if (quote && author && source) {
    console.log(
      `A request of: ${quote}, by ${author}, from ${source} was recieved...`
    );
    const newQuote = new Quote({
      _id: new mongoose.Types.ObjectId(),
      quote: quote,
      author: author,
      source: source,
    });
    //Attempts to save the quote object
    newQuote
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).send({
          message: "Succesfully Created Object",
          createdObject: newQuote,
        });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.status(422).send({
      warning: "Not a valid submission",
      message: "All fields must contain values",
    });
  }
});

app.listen(PORT, () => {
  console.log(`... currently listening on port ${PORT}`);
});
