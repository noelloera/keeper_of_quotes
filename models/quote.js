const mongoose = require('mongoose');
const {mongooseConnect, mongooseDisconnect} = require('../database/database.js');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId; 


//Provides the Schema skeleton
const quoteSchema = new Schema({
    id: ObjectId,
    quote: String,
    author: String,
    source: String
})

//Will use the Schema to create a new model for the Database
const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;

const allQuotes = [
    {
        id: shortid.generate(),
        quote: "First Quote",
        author: "First Author",
        source: "First Source"
    }
];

//Quote class constructor
class Quote {
    constructor(quote, author, source) {
        this.id = shortid.generate(),
            this.quote = quote;
        this.author = author;
        this.source = source;
    }
}