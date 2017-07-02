var Twitter = require('twitter');
var request = require('request');
var createKeyspace = require('./createKeyspace');
var database = require('./createKeyspace');
var clean = require('mysql');
//Twitter Account Variables
var consumer_key = process.env.consumer_key;
var consumer_secret = process.env.consumer_secret;
var access_token_key = process.env.access_token_key;
var access_token_secret = process.env.access_token_secret;
var twitter_topic = process.env.twitter_topic;

//elasticsearch server info
var fluent_server = process.env.FLUENT_SERVER;

var client = new Twitter({
  "consumer_key": consumer_key,
  "consumer_secret": consumer_secret,
  "access_token_key": access_token_key,
  "access_token_secret": access_token_secret
});

function search_twitter() {

  var stream = client.stream('statuses/filter', {
    track: twitter_topic
  });
  stream.on('data', function(event) {

    var message = JSON.stringify({
      'date': event.created_at,
      'username': event.user.screen_name,
      'tweet': event.text,
      'url:': 'https://twitter.com/' + event.user.screen_name + '/status/' + event.id_str,
    });

    var options = {
      url: fluent_server + '/scylladb',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': message.length
      },
      body: message
    }
  database.populateData(event.created_at,event.user.screen_name,event.text,'https://twitter.com/' + event.user.screen_name + '/status/' + event.id_str);
    request(options, function(error, response, body) {
      if (error) {
        console.log(error);
      } else {
}
    });
    });

  stream.on('error', function(error) {
    console.log('\nAn error has occurred.\n' + error + '\n');
  });

  stream.on('close', function(message) {
    console.log('\n\nConnection Closed. Restarting Stream.\n\n');
    search_twitter();
  });
}


if (consumer_key && consumer_secret && access_token_key && fluent_server && twitter_topic) {
      setTimeout(function() {
      console.log('\nCreating keyspace.....');
      database.createKeyspace();
      setTimeout(function(){
      console.log('\nLooking for ' + twitter_topic);
      search_twitter(); 
      }, 10000);
     },60000);
} else {
  console.log('\n[Error: Missing arguments!]\n');
}
