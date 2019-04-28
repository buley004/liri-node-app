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

//load moment
var moment = require("moment");

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
      if (!response.data[0]) {
        console.log("No concerts found!");
      }
      else {
        for (let i = 0; i < response.data.length; i++) {
          console.log("--------------------");
          console.log(response.data[i].venue.name);
          console.log(response.data[i].venue.city + ", " + (response.data[i].venue.region || response.data[i].venue.country));
          console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
        };
      };
    });
};

//function to search spotify api
var findSpotify = function (search) {
  spotify.search({ type: "track", query: search }, function (err, data) {
    if (err) {
      return console.log("Error: " + err);
    };
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Preview: " + data.tracks.items[0].preview_url);
  });
};

//function to search omdb api
var findMovie = function (search) {
  axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=full&tomatoes=true&apikey=trilogy")
    .then(function (response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Cast: " + response.data.Actors);    
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
      findConcerts(searchTerm);
      break;
    case "spotify-this-song":
      //run spotify api
      findSpotify(searchTerm);
      break;
    case "movie-this":
      //run ombd api
      findMovie(searchTerm);
      break;
    case "do-what-it-says":
      //run command for random.txt
      random();
      break;
    default:
      console.log("I don't recognize that command.");
  };
};

//main function call
searchCall(command, searchTerm);






