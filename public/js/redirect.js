var shortKey = window.location.pathname.replace(/\//, '');

$.ajax({
  type: 'POST',
  dataType: 'json',
  url: "https://0t1shqh0wj.execute-api.us-east-1.amazonaws.com/Production",
  data: "{\"short_key\": \"" + shortKey + "\", \"method\": \"post\"}"
})
.fail(function(jqXHR, textStatus, error) {
  window.location = "http://miniuri.me?error=1";
})
.success(function(data, textStatus) {
  window.location = data.uri;
});
