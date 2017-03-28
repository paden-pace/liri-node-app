
// To Do:
// Option: my-tweets
// Option: Spotify-Song
// Option: do-what-it-says
//


var liriKeys = require('./keys.js');
var inquirer = require("inquirer");
var request = require("request");

// console.log(liriKeys.twitterKeys);
// console.log(liriKeys.spotifyKeys);

// var nodeArgs = process.argv;

// var action = nodeArgs[2];

// console.log(action);




// Create a "Prompt" with a series of questions.
inquirer.prompt([

  // Here we give the user a list to choose from.
  {
    type: "list",
    message: "What would you like to do?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-is"],
    name: "selection"
  },

  // Here we ask the user to confirm.
  {
    type: "confirm",
    message: "Are you sure:",
    name: "confirm",
    default: true

  }

// Once we are done with all the questions... "then" we do stuff with the answers
// In this case, we store all of the answers into a "user" object that inquirer makes for us.
]).then(function(user) {


  // If we log that user as a JSON, we can see how it looks.
  console.log(JSON.stringify(user, null, 2));

  // If the user confirms, we displays the user's name and pokemon from the answers.
  if (user.confirm) {

    console.log("==============================================");
    console.log("");
    console.log("You have chosen: " + user.selection);
    console.log("");
    console.log("==============================================");

    
    if (user.selection == "my-tweets") {
    // Option: my-tweets
        console.log(liriKeys.twitterKeys);
    } else if (user.selection == "spotify-this-song") {
    // Option: spotify-this-song
        console.log(liriKeys.spotifyKeys);
        inquirer.prompt([
            {
            type: "input", 
            name: "name", 
            message: "What song would you like to look up?"
            },
        ]).then(function(song){
            console.log("you have chosen: " + song.name);
        })
    } else if (user.selection == "movie-this") {
    // Option: movie-this
        inquirer.prompt([
            {
            type: "input",
            name: "name",
            message: "What movie would you like to look up?"
            },
        ]).then(function(movie) {

            var title = movie.name;
            var newTitle = title.split(' ').join('+');
            var url = "http://www.omdbapi.com/?t=" + newTitle + "&y=&plot=short&r=json";

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
                    // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Year);
                    // console.log("Rotten Tomatoes URL: " + JSON.parse(body).Year);
                    console.log("");
                    console.log("----------------------------------------------");
                }
            });
        });
    } else if (user.selection == "do-what-it-says") {
    // Option: do-what-it-says
        console.log(liriKeys.spotifyKeys);
    }
  // If the user does not confirm, then a message is provided and the program quits.
  } else {

    console.log("");
    console.log("");
    console.log("That's okay, come again when you are more sure.");
    console.log("");
    console.log("");

  }

});
