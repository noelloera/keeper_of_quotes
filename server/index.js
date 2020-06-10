const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const allQuotes = {};

const PORT = process.env.PORT || 4001;

//Middleware for setting static directories
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.post('/', (req, res)=>{
    //check if there is values within the body, then push to array
    console.log(req.body.author)
    //allQuotes.push(req.body);
    console.log("...posting something")
})

app.listen( PORT, ()=>{
    console.log(`... currently listening on port ${PORT}`)
})