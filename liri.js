
// To Do:
// find rotten tomatoes api
// look into promises or the then function

var liriKeys = require('./keys.js');
var inquirer = require("inquirer");
var request = require("request");
var Twitter = require('twitter');
var spotify = require("spotify");
var file = require("file-system");
var fs = require('fs');


function questionOptions (){

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says", "exit"],
            name: "selection"
        }
    ]).then(function(user) {

        console.log("==============================================");
        console.log("");
        console.log("You have chosen: " + user.selection);
        console.log("");
        console.log("==============================================");
        
        if (user.selection == "my-tweets") {
        // Option: my-tweets
            var error = function (err, response, body) {
                console.log('ERROR [%s]', err);
            };
            var success = function (data) {
                console.log('Data [%s]', data);
            };
            
            var config = liriKeys.twitterKeys;

            var client = new Twitter(config);
            var params = {screen_name: 'paden_pace', count: '20'};
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    for(i=0; i<tweets.length; i++){
                        console.log("--------------------------------");
                        console.log("User Name: " + tweets[i].user.screen_name);
                        console.log("Time: " + tweets[i].created_at);
                        console.log("Tweet: " + tweets[i].text);
                        console.log("--------------------------------");
                    };
                }
            });
        } else if (user.selection == "spotify-this-song") {
        // Option: spotify-this-song
            inquirer.prompt([
                {
                type: "input", 
                name: "name", 
                message: "What song would you like to look up?"
                },
            ]).then(function(song){

                spotify.search({ type: 'track', query: song.name }, function(err, data) {
                    if ( err ) {
                        console.log('Error occurred: ' + err);
                        return;
                    } else {
                        console.log("-------------------------------");
                        console.log("Artist: " + data.tracks.items[0].artists[0].name);
                        console.log("Song Title: " + data.tracks.items[0].name);
                        console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
                        console.log("Album: " + data.tracks.items[0].album.name);
                        console.log("-------------------------------");
                    };
                });
            });
        } else if (user.selection == "movie-this") {
        // Option: movie-this
            inquirer.prompt([
                {
                type: "input",
                name: "name",
                message: "What movie would you like to look up?"
                },
            ]).then(function(movie) {
                if (movie.name == "") {
                    var title = "Mr. Nobody";
                    var newTitle = title.split(' ').join('+');
                    var url = "http://www.omdbapi.com/?t=" + newTitle + "&y=&plot=short&r=json&tomatoes=true";

                    console.log(url);
                    

                    // Then run a request to the OMDB API with the movie specified
                    request(url, function(error, response, body) {

                        // If the request is successful (i.e. if the response status code is 200)
                        if (!error && response.statusCode === 200) {

                            // Parse the body of the site and recover just the desired information
                            console.log("----------------------------------------------");
                            console.log("");
                            console.log("Film Title: " + JSON.parse(body).Title);
                            console.log("");
                            console.log("----------------------------------------------");
                            console.log("");
                            console.log("Release Year: " + JSON.parse(body).Year);
                            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                            console.log("Country of Origin: " + JSON.parse(body).Country);
                            console.log("Language: " + JSON.parse(body).Language);
                            console.log("Plot: " + JSON.parse(body).Plot);
                            console.log("Actors: " + JSON.parse(body).Actors);
                            console.log("Rotten Tomatos: " + JSON.parse(body).Ratings[1].Value);
                            console.log("");
                            console.log("----------------------------------------------");
                        }
                    });
                } else {
                    var title = movie.name;
                    var newTitle = title.split(' ').join('+');
                    var url = "http://www.omdbapi.com/?t=" + newTitle + "&y=&plot=short&r=json&tomatoes=true";

                    console.log(url);
                    //console.log(tomatoURL);

                    // Then run a request to the OMDB API with the movie specified
                    request(url, function(error, response, body) {

                        // If the request is successful (i.e. if the response status code is 200)
                        if (!error && response.statusCode === 200) {

                            // Parse the body of the site and recover just the desired information
                            console.log("----------------------------------------------");
                            console.log("");
                            console.log("Film Title: " + JSON.parse(body).Title);
                            console.log("");
                            console.log("----------------------------------------------");
                            console.log("");
                            console.log("Release Year: " + JSON.parse(body).Year);
                            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                            console.log("Country of Origin: " + JSON.parse(body).Country);
                            console.log("Language: " + JSON.parse(body).Language);
                            console.log("Plot: " + JSON.parse(body).Plot);
                            console.log("Actors: " + JSON.parse(body).Actors);
                            console.log("Rotten Tomatos: " + JSON.parse(body).Ratings[1].Value);
                            console.log("");
                            console.log("----------------------------------------------");
                        }
                    });
                };
            });
        } else if (user.selection == "do-what-it-says") {
        // Option: do-what-it-says
            fs.readFile('random.txt', 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                } else {
                    var options  = data.split(',');
                    var songTitle = options[1];
                    console.log(songTitle);
                    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
                        if ( err ) {
                            console.log('Error occurred: ' + err);
                            return;
                        } else {
                            console.log("-------------------------------");
                            console.log("Artist: " + data.tracks.items[0].artists[0].name);
                            console.log("Song Title: " + data.tracks.items[0].name);
                            console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
                            console.log("Album: " + data.tracks.items[0].album.name);
                            console.log("-------------------------------");
                        };
                    });
                };
            });
        } else if (user.selection == "exit") {
        // Option: exit
            console.log("Thanks for coming.")
        };
    });
};

questionOptions ();
