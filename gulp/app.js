var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


var http = require('http');

http.createServer(function (request, response) {

  response.writeHead(200, {
     'Content-Type': 'text/plain'
  });
  //response.redirect('url');
  response.end();
}).listen(8080);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});