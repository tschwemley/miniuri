$(function() {
  var minButton = $('.min-button');
  var uri = $('.url').text();
  alert(uri);
  minButton.on('click', function() {
    $.ajax({
      url: 'https://0t1shqh0wj.execute-api.us-east-1.amazonaws.com/Production/create-uri',
      method: 'PUT',
      data: {
        uri: uri
      },
      dataType: 'json',
    })
    .fail(function(jqXHR, textStatus, error) {
      console.log("jqXHR");
      console.log(jqXHR);
      console.log("status: " + textStatus);
      console.log("error: " + error);
    })
    .success(function(data, textStatus) {
      console.log("success: " + data);
    });
  });
});
