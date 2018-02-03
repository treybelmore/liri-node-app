//added per dotenv npm
require("dotenv").config();

var fs = require("fs");

var command = (process.argv[2]);

var search  = ""

var keys = require("./keys");

if (process.argv.length > 3) {
	for(i = 3; i < process.argv.length; i++){
		search += (process.argv[i] + "+")
	}
}
else {var search = (process.argv[3])}

function twitterSearch(){
//documentation from twitter node
	var Twitter = require('twitter');
 //create var to access keys
	var client = new Twitter(keys.twitter);
 	
	var params = {screen_name: 'SMU Bootcamp',
				  count: 10};

//get request
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {	
  		for (i=0; i < tweets.length; i++){
  			console.log(tweets[i].text);
  		}
    
  	}

});

}

function spotifySearch(){
	var Spotify = require('node-spotify-api');
 
 //create var to access keys
	var spotify = new Spotify(keys.spotify);
 
	spotify.search({ type: 'track', query: search }, function(err, data) {
  	if (err) {
    return console.log('Error occurred: ' + err);
  	}
 
	console.log("Artist:", data.tracks.items[0].album.artists[0].name);
    console.log("Song:", data.tracks.items[0].name);
    console.log("Preview link:", data.tracks.items[0].preview_url);
    console.log("Album:", data.tracks.items[0].album.name);
});

}

function omdbSearch(){
	var request = require("request");

	request("http://www.omdbapi.com/?t="+ search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {
  	console.log("Movie Title: " + JSON.parse(body).Title);
  	console.log("Release Year: " + JSON.parse(body).Year);
 	console.log("The IMDB rating is: " + JSON.parse(body).imdbRating);
 	console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
 	console.log("The movie was filmed in: " + JSON.parse(body).Country);
 	console.log("Language: " + JSON.parse(body).Language);
 	console.log("Plot: " + JSON.parse(body).Plot);
 	console.log("Cast: " + JSON.parse(body).Actors);
  	}
 	})

}

function doWhat(){
	fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

		data = data.split(", ");
    	command = data[0];
    	search = data[1];
    	runCommand(command, search)
});

}


function runCommand(command){
	if(command === "my-tweets"){
		twitterSearch();
	}
	else if(command === "spotify-this-song"){
		spotifySearch();
	}
	else if (command === "movie-this"){
		omdbSearch();
	}
	else if (command === "do-what-it-says"){
		doWhat();
	}
}
runCommand(command);