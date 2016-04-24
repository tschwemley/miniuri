var apiHandler = require('./lib/api-handler.js');

exports.handler = function(event, context, callback) {
  switch (event.method) {
    case 'put':
      apiHandler.putUri(event, context, callback);
      break;

    case 'get':
      apiHandler.getUri(event, context, callback);
      break;
    
    default:
      callback("There was an error making the request");
  }
};
