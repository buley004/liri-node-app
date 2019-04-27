//set environment variables
require("dotenv").config();

//load keys
var keys = require("./keys.js");

//load axios
var axios = require("axios");

//load spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//store liri command
var command = process.argv[2];

//store search term
var searchTerm = process.argv.slice(3).join(" ");

//function to search bands in town api
var findConcerts = function(search) {
  //use axios to call bands in town api
  axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
    .then(function(response){
      console.log(response.data);
    });
};

//function to search spotify api
var findSpotify = function(search) {
  spotify.search({type: "track", query: search}, function(err, data){
    if(err){
      return console.log("Error: " + err);
    };
    console.log(data);
  })
};

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
    break;
  case "do-what-it-says":
    //run command for random.txt
    console.log('random');
    break;
  default:
    console.log("I don't recognize that command.");
};

console.log(searchTerm);



  

  
