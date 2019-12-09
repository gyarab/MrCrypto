const rp = require('request-promise');
const url = 'https://news.bitcoin.com/';
const $ = require('cheerio')
var http = require('http');


rp(url)
  .then(function(html){
    //success!
//ht = html;
ht1 = $('.story.story--huge', html).find('a').find('h5').text();
ht2 = $('.story.story--huge', html).find('a').find('img').attr('src');
ht3 = $('.story.story--huge', html).find('a').attr('href');

 console.log(2);
    http.createServer(function (req, res) {
      console.log("Request handler random was called.");
res.writeHead(200, {"Content-Type": "application/json"});
      var otherArray = ["title", "imgurl", "arturl"];
      var otherObject = { title: ht1, imgurl: ht2, arturl: ht3 };
      var json = JSON.stringify({
        anObject: otherObject,
        anArray: otherArray,
      });
      res.end(json);
    }).listen(1337);
    console.log(2);
  })
  .catch(function(err){
    //handle error
  });
