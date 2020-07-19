const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Quote = require("./models/quote");
const mongoose = require("mongoose");
const { connect, disconnect } = require("./database/database");
const { isFunction } = require("util");

const PORT = process.env.PORT || 4001;

//MORGAN
app.use(
  //MORGAN
  morgan("tiny"),
  //STATIC PUBLIC DIRECTORY
  express.static("public"),
  //JSON BODY PARSER
  bodyParser.json(),
  //URL ENDCONDED BODY PARSER 
  bodyParser.urlencoded({extended:false})
  );


//DATABASE CONNECT
connect();

//GET ROOT PAGE
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "index.html"));
  res.status(200);
});

//GET ALL OBJECTS
app.get("/quotes", (req, res) => {
  Quote.find()
    .exec()
    .then((response) => {
      res.status(200).send({
        message: "All Quote Objects",
        allObjects: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: error });
    });
});

//GET OBJECT BY ID
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
          message: "Cannot delete invalid ID: " + id,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
});

//DELETE OBJECT BY ID
app.delete("/quotes/:quoteId", (req, res, next) => {
  const id = req.params.quoteId;
  if (id) {
    Quote.findByIdAndDelete(id, (error, quote) => {
      if (error) {
        console.log(error);
        res.status(404).send({
          message: "Cannot delete invalid ID: " + id,
        });
      } else {
        res.status(202).send({
          message: "Successfully deleted Object",
          deletedObject: quote,
        });
      }
    });
  } else {
    res.status(404).send({
      message: "Cannot delete invalid ID: " + id,
    });
  }
});

//POST NEW QUOTE
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
          message: "Succesfully created Object",
          createdObject: newQuote,
        });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.status(422).send({
      message: "All fields must contain values",
    });
  }
});

//PUT OBJECT BY ID
app.put("/quotes/:quoteId",(req,res,next)=>{
  
})

app.listen(PORT, () => {
  console.log(`... currently listening on port ${PORT}`);
});
