const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Quote = require('../models/quote');
const mongoose = require('mongoose');
const { connect, disconnect } = require('../database/database');


const PORT = process.env.PORT || 4001;

//middleware bodyParser for app/x-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }));

//middleware bodyParser for app/json requests
app.use(bodyParser.json());

//Middleware for morgan 
app.use(morgan('tiny'));

//Middleware for setting static directories
app.use(express.static('public'));

connect();


//Will send the Homepage
app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'index.html'))
    res.status(200);

})

//Retrieves all the quotes
app.get('/quotes', (req, res) => {
    var query = Quote.find();
    res.send(query).status(200)
})

app.get("/:quoteId", (req, res, next)=>{
    const id = req.params.quoteId;
    Quote.findById(id)
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send({error:error})
    })
})


app.post('/quotes', (req, res) => {
    //Request variables//
    const quote = req.body.quote;
    const author = req.body.author;
    const source = req.body.source;
    //Checks if the inputs include values
    if (quote && author && source) {
        console.log(`A request of: ${quote}, by ${author}, from ${source} was recieved...`)
        const newQuote = new Quote({
            _id: new mongoose.Types.ObjectId(),
            quote: quote,
            author: author,
            source: source
        })
        newQuote.save()
        .then(result=>{
            console.log(result)
        })
        .catch(error=>{
            throw error;
        })
        console.log(newQuote);
        res.status(201).send(newQuote);
    } else {
        console.log("Not a valid submition")
        res.status(422).send({message:"All fields must contain values"});
    }
})

app.listen(PORT, () => {
    console.log(`... currently listening on port ${PORT}`)
})