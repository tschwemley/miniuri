var mysql = require('mysql');
var dbCredentials = require('./db-credentials.js');

module.exports = {
  connection: mysql.createConnection(dbCredentials),

  putUri: function(event, context, callback) {
    'use strict';

    // Uri is a required parameter
    if (event.uri === null || event.uri === 'undefined') {
      callback("Missing uri parameter");
    }

    var connection = mysql.createConnection(dbCredentials);
    var shortKey = this.randomString(5);
    var sql = 'INSERT INTO uris (uri, short_key) VALUES (?,?)';
    var params = [event.uri, shortKey];

    connection.query(sql, params, function(err, result) {
      if (err) {
        console.log("put query error: " + err);
        callback("Error saving uri.");
        connection.end();
      } else {
        var response = {
          original_url: event.uri,
          short_key: shortKey
        };

        callback(null, response);
        connection.end();
      } 
    });
  },

  postUri: function(event, context, callback) {
    'use strict';

    if (event.short_key === null || event.short_key === 'undefined') {
      callback("Missing short_key parameter");
    }

    var connection = mysql.createConnection(dbCredentials);
    var shortKey = event.short_key;
    var sql = "SELECT uri FROM uris WHERE short_key = ?;" +
        "UPDATE uris SET hits = hits + 1 WHERE short_key = ?;";

    connection.query(sql, [shortKey, shortKey], function(err, result, fields) {
      if (err) {
        console.log("get query error: " + err);
        callback("Error getting url. This is likely becaues the short code" +
            " doesn't exist.");
        connection.end();
      } else {
        if (result.length > 2) {
          callback("There was an error processing short code: " + shortKey);
        } else {
          var uriResult = result[0];

          // If shortcode doesn't exist redirect back to home page
          var uri;
          if (uriResult.length === 0) {
            uri = 'http://miniuri.me'; 
          } else {
            uri = uriResult[0].uri; 
          }

          var response = {
            uri: uri
          };

          callback(null, response);
        }

        connection.end();
      }
    });
  },

  randomString: function randomString(len) {
      charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var randomStr = '';
      for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomStr += charSet.substring(randomPoz,randomPoz+1);
      }
      return randomStr;
  }
};
