//Initialize Express Server
var express = require('express')

//Get Supporting Requirements
var app = express()
var bodyParser = require('body-parser');
var path = require('path');

//set header controls
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

//simple in-memory data structure
var data = []; //{"Id": 0, "Topic": "Rahul", "Votes": 1} (example of row)
var size = 0;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//main message (to check if API Server is up!)
app.get('/',function (req,res) {
    res.send("This is the API Server to manage the Reddit App!");
});

//POST a new topic
//checks for topic length and duplicate topics
app.post('/topic', bodyParser.urlencoded(), function(req, res) {
	
	var topic = req.body.topic;
	var duplicate = false;

	for (var i = 0; i < size; ++i) {
		if (data[i] != null && data[i]["Topic"] == topic)
			duplicate = true;
	}

	if (topic.length > 255) {
		res.status(401).send("Topic length is too long (exceeds 255 characters)");
	} else if (duplicate) {
		res.status(401).send("Topic already created!");
	} else {

		var lastId = -1;

		if (size != 0)
			lastId = data[size - 1]["Id"];

		
		var row = {"Id": lastId + 1, "Topic": topic, "Votes": 0};

		data.push(row);
		size++;

		res.send(JSON.stringify({text : "Succesfully Added Topic!"}));
	}
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

//Unforseen error handling
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('There was an error')
})

var port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Application listening on port ${port}!`))

module.exports = app;
