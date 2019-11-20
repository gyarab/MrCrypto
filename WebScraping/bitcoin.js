const rp = require('request-promise');
const url = 'https://news.bitcoin.com/';
const $ = require('cheerio');
var http = require('http');

rp(url)
  .then(function(html){
    //success!
//ht = html;
ht = $('.td-main-content-wrap', html).html();
 console.log(2);
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
