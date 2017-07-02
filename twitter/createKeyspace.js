"use strict";
var cassandra = require('cassandra-driver');
var responseData = '';
var scylladb_server = process.env.SCYLLADB_SERVER;
var clean = require('mysql');
var createKeyspace = function() {
  var client = new cassandra.Client({
    contactPoints: [scylladb_server]
  });
  client.execute("CREATE KEYSPACE fluentdloggers WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy','DC1' : 2, 'DC2': 1 };", function(err, result) {
    if (err) {
      console.log('\nError:' + err);
    }
    createTable();
  });

}
var populateData = function(date, username, tweet, url) {
  var client = new cassandra.Client({
    contactPoints: [scylladb_server],
    keyspace: 'fluentdloggers'
  });
  //tweet = clean.escape(tweet);
  //url = clean.escape(url);
  //date = clean.escape(date);
  //username = clean.escape(username);
  var query = 'INSERT INTO tweets (date,username,tweet, url) VALUES (?, ?, ?, ?)';
  const parms = [date, username, tweet, url];

  client.execute(query, parms, function(err, result) {

    if (err) {
      console.log('\nError' + err);
    }
  });
};

function createTable() {
  var client = new cassandra.Client({
    contactPoints: [scylladb_server],
    keyspace: 'fluentdloggers'
  });

  client.execute("CREATE TABLE tweets (Date text,UserName text PRIMARY KEY, Tweet text, URL text);", function(err, result) {
    if (err) {
      console.log('\n' + err);
    }
  });
}
module.exports.populateData = populateData;
module.exports.createKeyspace = createKeyspace;
