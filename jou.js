const rp = require('request-promise');
const url = 'https://www.idnes.cz/';
const $ = require('cheerio');
var http = require('http');

rp(url)
  .then(function(html){
    //success!
//ht = html;
    ht = $('#art-top2', html).html();
    console.log(1);
    http.createServer(function (req, res) {
        res.write('<html><head></head><body>');
        res.write(ht);
      res.end('</body></html>');
    }).listen(1337);
    console.log(2);
  })
  .catch(function(err){
    //handle error
  });
