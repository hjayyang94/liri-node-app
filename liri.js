var fs = require('fs');

var action = process.argv[2];
var value = process.argv[3];

switch(action){
    case "my-tweets": myTweets(value);
    break;

    case "spotify-this-song": spotifyThis(value);
    break;

    case "movie-this": movieThis(value);
    break;

    case "do-what-it-says": doThis(value);
    break;
}

function myTweets(){
    var keys = require("./keys.js");
    var Twitter = require('twitter');
    var client = new Twitter(keys);
    client.get('statuses/user_timeline.json?screen_name=hjayyang94&count=20', function (error, tweets) {
        if (error) {
            console.log(error);
        }
        else {
            var info = [];
            for (var i = 0; i < tweets.length; i++) {
                info.push("--------------------");
                info.push(tweets[i].text)
                info.push(tweets[i].created_at)
                
            }
            for (var i =0; i < info.length; i++){
                console.log(info[i]);
                logThis(info[i]+"\n");
            }
        }
    })
}

function spotifyThis(value){
    var Spotify = require('node-spotify-api');

    var spotifyKey = {
        id: "f22a449b8ba447d997a8df79da459d5b",
        secret: "68ac757bf4544ca5b70dcfc69ffbc75a"
    }

    var spotify = new Spotify(spotifyKey);
    var content = [];

    if (value === undefined) {
        spotify.request('https://api.spotify.com/v1/search?q="the-sign"&type=track')
            .then(function (data) {
                content.push("----------------------------------------");
                content.push('Artist: ' + data.tracks.items[0].artists[0].name);
                content.push('Song: ' + data.tracks.items[0].name);
                content.push('Preview Link: ' + data.tracks.items[0].preview_url);
                content.push('Album: ' + data.tracks.items[0].album.name);
                content.push("----------------------------------------");
                
                for (var i = 0; i < content.length; i++){
                    console.log(content[i]);
                    logThis(content[i]+"\n");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            
    }

    else {
        spotify.request('https://api.spotify.com/v1/search?q="' + value + '"&type=track')
            .then(function (data) {
                content.push("----------------------------------------");
                content.push('Artist: ' + data.tracks.items[0].artists[0].name);
                content.push('Song: ' + data.tracks.items[0].name);
                content.push('Preview Link: ' + data.tracks.items[0].preview_url);
                content.push('Album: ' + data.tracks.items[0].album.name);
                content.push("----------------------------------------");
                for (var i = 0; i < content.length; i++){
                    console.log(content[i]);
                    logThis(content[i]+"\n");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            
    }
}

function movieThis(value){
    var request = require('request');
    var key = "e810e43c";
    var content = [];

    if (value === undefined) {
        request('http://www.omdbapi.com/?t=Mr.+Nobody&apikey=e810e43c', function (error, data, body) {
            if (error) {
                console.log(error);
            }
            var info = JSON.parse(body);
            content.push("---------------------------------------");
            content.push("Title: "+info.Title);
            content.push("Year: "+info.Year);
            content.push("IMDB Rating: "+info.imdbRating);
            content.push("Rotten Tomates: "+info.Ratings[1].Value);
            content.push("Produced in: "+info.Country);
            content.push("Language: "+info.Language);
            content.push("Plot: "+info.Plot);
            content.push("Actors: "+ info.Actors);
            content.push("---------------------------------------");

            for (var i = 0; i < content.length; i++){
                console.log(content[i]);
                logThis(content[i]+"\n");
        }
        })
    }
    else {
        request('http://www.omdbapi.com/?t='+value+'&apikey=e810e43c', function (error, data, body) {
            if (error) {
                console.log(error);
            }
            var info = JSON.parse(body);
            content.push("---------------------------------------");
            content.push("Title: "+info.Title);
            content.push("Year: "+info.Year);
            content.push("IMDB Rating: "+info.imdbRating);
            content.push("Rotten Tomates: "+info.Ratings[1].Value);
            content.push("Produced in: "+info.Country);
            content.push("Language: "+info.Language);
            content.push("Plot: "+info.Plot);
            content.push("Actors: "+ info.Actors);
            content.push("---------------------------------------");

            for (var i = 0; i < content.length; i++){
                console.log(content[i]);
                logThis(content[i]+"\n");
        }
        })
    }
   
}

function doThis(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            console.log(error);
        }
        var dataArr = data.split(",");
        var action = dataArr[0];
        var value = dataArr[1];
        switch(action){
            case "my_tweets": myTweets();
            break;
        
            case "spotify-this-song": spotifyThis(value);
            break;
        
            case "movie-this": movieThis(value);
            break;
        
            case "do-what-it-says": doThis();
            break;
        }

    })
}

function logThis(content){
    fs.appendFile("log.txt",content, function(error){
        if (error){
            console.log(error);
        }
    })
}
