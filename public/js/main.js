
$(function() {
  'use strict';

  var uri;

  $('form').on('submit', function(e) {
    e.preventDefault();
    uri = $('.url').val();
    
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url: "https://0t1shqh0wj.execute-api.us-east-1.amazonaws.com/Production",
      data: "{\"uri\": \"" + uri + "\", \"method\": \"put\"}"
    })
    .fail(function(jqXHR, textStatus, error) {
      console.log("error: " + error);
    })
    .success(function(data, textStatus) {
      console.log(data);
      var miniUri = "http://miniuri.me/" + data.short_key;
      var successText = "Success! Your minimized uri is: <a href='" + miniUri + 
          "'>" + miniUri;

      $('.uri-display').html(successText).show();
    });
  });
});
