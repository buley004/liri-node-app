//set environment variables
require("dotenv").config();

//load keys
var keys = require("./keys.js");

//load axios
var axios = require("axios");

//load spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//load fs
var fs = require("fs");

//store liri command
var command = process.argv[2];

//store search term
var searchTerm = process.argv.slice(3).join(" ");

//function to search bands in town api
var findConcerts = function (search) {
  //use axios to call bands in town api
  axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response.data);
    });
};

//function to search spotify api
var findSpotify = function (search) {
  spotify.search({ type: "track", query: search }, function (err, data) {
    if (err) {
      return console.log("Error: " + err);
    };
    console.log(data);
  });
};

//function to search omdb api
var findMovie = function (search) {
  axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=full&tomatoes=true&apikey=trilogy")
    .then(function (response) {
      console.log(response.data);
    });
};

//function to search from txt file
var random = function () {
  fs.readFile("random.txt", "utf8", function (err, data) {
    console.log(data);
    
    //parse data into command and search term
    textInputs = data.split(",");
    
    //call main search function
    searchCall(textInputs[0], textInputs[1]);
  })
}

//function to call apis based on inputs
function searchCall(command, searchTerm) {
  switch (command) {
    case "concert-this":
      //run bands in town api
      console.log('bands');
      findConcerts(searchTerm);
      break;
    case "spotify-this-song":
      //run spotify api
      console.log('spotify');
      findSpotify(searchTerm);
      break;
    case "movie-this":
      //run ombd api
      console.log('omdb');
      findMovie(searchTerm);
      break;
    case "do-what-it-says":
      //run command for random.txt
      console.log('random');
      random();
      break;
    default:
      console.log("I don't recognize that command.");
  };
};

console.log(searchTerm);

searchCall(command, searchTerm);






