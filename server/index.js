//Initialize Express Server
var express = require('express')

//Get Supporting Requirements
var app = express()
var bodyParser = require('body-parser');

//set header controls
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

//main message (to check if API Server is up!)
app.get('/',function (req,res) {
    res.send("This is the API Server to manage the Reddit App!");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
