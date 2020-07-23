//Express
const express = require("express");
const router = express.Router();
//DB
const Quote = require("../models/quote");
const mongoose = require("mongoose");
const { connect, disconnect } = require("../database/database");

//GET ALL OBJECTS
router.get("/quotes", (req, res) => {
    connect();
    Quote.find((error, quotes) => {
      if (error) {
        res.status(500).send({
          message: "Cannot retrive Objects",
          error: error,
        });
        disconnect();
      } else {
        res.status(200).send({
          message: "Successfully found Objects",
          allObjects: quotes
        });
        disconnect();
      }
    });
  });
  
  //GET OBJECT BY ID
  router.get("/quotes/:quoteId", (req, res, next) => {
    const id = req.params.quoteId;
    if (id) {
      connect();
    }
    Quote.findById(id, (error, quote) => {
      if (error) {
        console.log(error);
        res.status(404).send({
          message: "Cannot delete invalid ID: " + id,
        });
        disconnect();
      } else {
        res.status(200).send({
          message: "Successfully found Object",
          existingObject: quote,
        });
        disconnect();
      }
    });
  });
  
  //DELETE OBJECT BY ID
  router.delete("/quotes/:quoteId", (req, res, next) => {
    const id = req.params.quoteId;
    if (id) {
      connect();
    }
    Quote.findByIdAndDelete(id, (error, quote) => {
      if (error) {
        console.log(error);
        res.status(404).send({
          message: "Cannot delete invalid ID: " + id,
        });
        disconnect();
      } else {
        res.status(202).send({
          message: "Successfully deleted Object",
          deletedObject: quote,
        });
        disconnect();
      }
    });
  });
  
  //POST NEW QUOTE
  router.post("/quotes", (req, res) => {
    //Request variables//
    const quote = req.body.quote;
    const author = req.body.author;
    const source = req.body.source;
    //Checks if the inputs include values
    if (quote && author && source) {
      connect();
      const newQuote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        quote: quote,
        author: author,
        source: source,
      });
      //Attempts to save the quote object
      newQuote.save((error, quote) => {
        if (error) {
          res.status(422).send({
            message: "All fields must contain values",
          });
          disconnect();
        } else {
          res.status(201).send({
            message: "Succesfully created Object",
            createdObject: quote,
          });
          disconnect();
        }
      });
    }else{
      res.status(422).send({
        message: "All fields must contain values",
    })
  }
  
  });
  
  //PUT OBJECT BY ID
  router.put("/quotes/:quoteId", (req, res, next) => {
    const id = req.params.quoteId;
    const quote = req.body.quote;
    const author = req.body.author;
    const source = req.body.source;
  
    if (quote && author && source) {
      connect();
      const updatedQuote = {
        quote: quote,
        author: author,
        source: source,
      };
      Quote.findByIdAndUpdate(id, updatedQuote, (error, object) => {
        if (error) {
          res.send(404).send({
            message: "Cannot update invalid ID",
            error: error
          });
          disconnect();
        } else {
          res.status(202).send({
            message: "Successfully updated Object",
            oldObject: object,
            newObject: updatedQuote,
          });
          disconnect();
        }
      });
    } else {
      res.status(422).send({
        message: "All fields must contain values",
      });
    }
  });

  module.exports = router;