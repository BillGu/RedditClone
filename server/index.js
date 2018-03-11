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

//simple in-memory data structure
var data = [{"Id": 1, "Topic": "Rahul", "Votes": "1"}];
var size = 1;

//main message (to check if API Server is up!)
app.get('/',function (req,res) {
    res.send("This is the API Server to manage the Reddit App!");
});

//POST a new topic
//TODO: check if topic already exists and return error message
app.post('/topic', bodyParser.urlencoded(), function(req, res) {
	
	var lastId = data[size - 1]["Id"];

	var topic = req.body.topic;
	var row = {"Id": lastId + 1, "Topic": topic, "Votes": 0};

	data.push(row);
	size++;

	res.send(JSON.stringify({text : "Succesfully Added Topic!"}));
});

//Upvote a topic
app.get('/topic/upvote/:id', bodyParser.urlencoded(), function(req, res) {

	var id = req.params.id;

	if (id >= 0 && id < size && data[id] != null) {

		var row = data[id];
		row["Votes"]++;
		res.send(JSON.stringify({text : "Succesfully Upvoted on " + row["Topic"]}));

	} else {
		res.status(401).send("Error in id value passed in");
	}

});

//Downvote a topic
app.get('/topic/downvote/:id', bodyParser.urlencoded(), function(req, res) {

	var id = req.param.id;

	if (Number.isInteger(id) && id > 0 && id < size && data[id] != null) {

		var row = data[id];
		row["Votes"]--;
		res.send(JSON.stringify({text : "Succesfully Downvoted on " + data["Topic"]}));

	} else {
		res.status(401).send("Error in id value passed in");
	}

});

//GET all topics
app.get('/topic', bodyParser.urlencoded(), function(req, res) {
	res.send(JSON.stringify(data));
});

app.listen(5000, () => console.log('Server listening on port 5000!'))
