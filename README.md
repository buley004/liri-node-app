# liri-node-app

This command line application utilizes node to search for movies, concerts, and songs.

Command line input will use the following format:

`node liri.js [command] [search term]`

Accepted commands are `movie-this`, which searches the OMDB API; `spotify-this-song`, which searches the Spotify API; `concert-this`, which searches the BandsInTown API; and `do-what-it-says`, which reads a command and search term from the included `random.txt` file.

`spotify-this-song` will return artist, song, and a Spotify preview link

`concert-this` will return venue, location, and date for each concert found

`movie-this` will return title, year, IMDB rating, RT rating, country, language, plot, and cast.