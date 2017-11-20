var fs = require('fs');
var keys = require("./keys.js");
var Twitter = require('twitter');

if (process.argv[2]==="my-tweets"){
    //last 20 tweets + when they were created
    var client = new Twitter(keys);
    client.get('statuses/user_timeline.json?screen_name=hjayyang94&count=20', function(error, tweets){
        if (error) {
            console.log(error);
        }
        else{
            for (var i = 0; i < tweets.length; i++){
                console.log("--------------------")
                console.log(tweets[i].text);
                console.log(tweets[i].created_at)
            }
        }   
    })
}

else if (process.argv[2]==="spotify-this-song"){
    //Information about 
    // Artist
    // Song Title
    // Preview link on spotify
    // album song is from

    //if no song provided then by default "The Sign" by Ace of Base

}

else if (process.argv[2]==="movie-this"){

}

else if (process.argv[2]==="do-what-it-says"){

}