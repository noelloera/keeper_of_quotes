const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId; 


//Provides the Schema skeleton
const quoteSchema = new Schema({
    _id: ObjectId,
    quote: String,
    author: String,
    source: String
})

//Will use the Schema to create a new model for the Database
const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;