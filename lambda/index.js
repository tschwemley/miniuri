'use strict';

var util = require('util');
var mysql = require('mysql');
var dbCredentials = require('./db-credentials.js');

exports.handler = function(event, context, callback) {
  // Uri is a required parameter
  if (event.uri == null) {
    callback("Missing uri parameter");
  }

  var connection = mysql.createConnection(dbCredentials);

  connection.connect();

  var shortKey = randomString(5);
  var sql = 'INSERT INTO uris (uri, short_key) VALUES (?,?)';
  var params = [event.uri, shortKey];

  connection.query(sql, params, function(err, result) {
    if (err) {
      console.log("error: " + err);
    } else {
      console.log("result: " + result);

      var resultObject = {
        original_url: event.uri,
        short_key: shortKey
      };

      callback(null, resultObject);
    } 
  });

  connection.end();
}

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
