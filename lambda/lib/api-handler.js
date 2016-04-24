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

    var shortKey = this.randomString(5);
    var sql = 'INSERT INTO uris (uri, short_key) VALUES (?,?)';
    var params = [event.uri, shortKey];

    this.connection.query(sql, params, function(err, result) {
      if (err) {
        console.log("put query error: " + err);
        callback("Error saving uri.");
      } else {
        var response = {
          original_url: event.uri,
          short_key: shortKey
        };

        callback(null, response);
      } 
    });

    this.connection.end();
  },

  getUri: function(event, context, callback) {
    'use strict';

    if (event.short_key === null || event.short_key === 'undefined') {
      callback("Missing short_key parameter");
    }

    var shortKey = 'pXSl1';
    var sql = "SELECT uri FROM uris WHERE short_key = ?;" +
        "UPDATE uris SET hits = hits + 1 WHERE short_key = ?;";
    this.connection.query(sql, [shortKey, shortKey], function(err, result, fields) {
      if (err) {
        console.log("get query error: " + err);
        callback("Error getting url. This is likely becaues the short code" +
            " doesn't exist.");
      } else {
        if (result.length > 2) {
          callback("There was an error processing short code: " + shortKey);
        } else {
          var response = {
            uri: result[0][0].uri,
          };

          callback(null, response);
        }
      }
    });

    this.connection.end();
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
