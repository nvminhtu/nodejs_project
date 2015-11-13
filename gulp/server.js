
var http = require('http'),
		fileSystem = require('fs'),
    path = require('path');

http.createServer(function (request, response) {

	var filePath = path.join(__dirname, 'index.html');
  var stat = fileSystem.statSync(filePath);
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  
  var readStream = fileSystem.createReadStream(filePath);
  readStream.pipe(response);
}).listen(8080);