const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const shortid = require('shortid')

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

const PORT = process.env.PORT || 4001;

//middleware bodyParser for app/x-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }));

//middleware bodyParser for app/json requests
app.use(bodyParser.json());

//Middleware for morgan 
app.use(morgan('tiny'));

//Middleware for setting static directories
app.use(express.static('public'));

//Will send the Homepage
app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'index.html'))
    res.status(200);
})


app.get('/quotes', (req, res) => {
    res.send(allQuotes).status(200)
})

app.post('/quotes', (req, res) => {
    //Request variables//
    const quote = req.body.quote;
    const author = req.body.author;
    const source = req.body.source;
    //Checks if the inputs include values
    if (quote && author && source) {
        console.log(`A request of: ${quote}, by ${author}, from ${source} was recieved...`)
        const newQuote = new Quote(quote, author, source)
        console.log(newQuote);
        allQuotes.push(newQuote);
        res.status(201).send(newQuote);
    } else {
        res.status(422).send();
    }
})

app.listen(PORT, () => {
    console.log(`... currently listening on port ${PORT}`)
})