const rp = require('request-promise');
const url = 'https://www.idnes.cz/';
const $ = require('cheerio');
var http = require('http');
var time = 0;
httpServer = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var timer = setInterval(function(){
  time +=2;
  res.write("runnin");
    if (time > 5) {
      clearInterval(timer);
  res.end('Hello World\n');
    }
  },2000);

});
httpServer.listen(1337, "127.0.0.1");
