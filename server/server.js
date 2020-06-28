const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const allQuotes = [
    {quote: "First Quote",
    author: "First Author",
    source: "First Source"}
];

const PORT = process.env.PORT || 4001;

//middleware bodyParser for app/x-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }));

//middleware bodyParser for app/json requests
app.use(bodyParser.json());

//Middleware for setting static directories
app.use(express.static(path.join(__dirname,'../public')));

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
    res.status(200);
})

app.get('/quotes',(req,res)=>{
    res.send(allQuotes).status(200)
})

app.post('/', (req, res)=>{
    //Request variables//
    const quote = req.body.quote;
    const author = req.body.author;
    const source = req.body.source;
    if(quote && author && source){
        console.log(`A request of: ${quote}, by ${author}, from ${source} was recieved...`)
        allQuotes.push(req.body);
        res.status(201).send(allQuotes);
    }
})

app.listen(PORT, ()=>{
    console.log(`... currently listening on port ${PORT}`)
})