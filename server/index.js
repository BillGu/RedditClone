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

//Upvote or Downvote a topic
app.get('/topic/vote/:id/:flag', bodyParser.urlencoded(), function(req, res) {
	var id = req.params.id;
	var flag = req.params.flag;

	if (id >= 0 && id < size && data[id] != null) {

		var row = data[id];

		if (flag == 1) {
			row["Votes"]++;
			res.send(JSON.stringify({text : "Succesfully Upvoted on " + row["Topic"]}));
		} else if (flag == 0) {
			row["Votes"]--;
			res.send(JSON.stringify({text : "Succesfully Downvoted on " + row["Topic"]}));
		} else {
			res.status(401).send("Error in flag passed in");
		}

	} else {
		res.status(401).send("Error in id value passed in");
	}
});

//GET all topics - sorted by votes
app.get('/topic/:flag', bodyParser.urlencoded(), function(req, res) {

	var flag = req.params.flag;
	var tempData = [];

	for (var i = 0; i < size; ++i) {
		if (data[i] != null)
			tempData.push(data[i]);
	}

	tempData.sort(function(first, second) {
		if (first["Votes"] > second["Votes"]) {
			return -1;
		} else if (first["Votes"] < second["Votes"]) {
			return 1;
		} else {
			return 0;
		}
	});

	if (flag == 0 || tempData.length <= 20)
		res.send(JSON.stringify(tempData));
	else if (flag == 1) {
		var newData = [];
		for (var i = 0; i < 20; ++i)
			newData.push(tempData[i]);
		res.send(JSON.stringify(newData));
	} else {
		res.status(401).send("Error in flag passed in");
	}
});

//Remove a topic
app.get('/topic/remove/:id', bodyParser.urlencoded(), function(req, res) {
	var id = req.params.id;
	if (id >= 0 && id < size && data[id] != null) {
		var topic = data[id]["Topic"];
		data[id] = null;
		res.send(JSON.stringify({text : "Removed " + topic}));
	} else {
		res.status(401).send("Topic at ID value removed or does not exit!")
	}
});

app.listen(5000, () => console.log('Server listening on port 5000!'))
