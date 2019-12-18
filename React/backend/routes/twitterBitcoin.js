var express = require("express");
var router = express.Router();

const rp = require("request-promise");
var URL = "https://twitter.com/search?q=Bitcoin&src=typeahead_click";
const $ = require("cheerio");

router.get("/twitter", async function(req, res, next) {
  var tweets = [];
  await rp(URL).then(html => {
    ht = $("li.stream-item", html).each(function(index) {
      var name = $(this)
        .find(".fullname")
        .text();
      var tweet = $(this)
        .find("p.tweet-text")
        .text();
      var profileimg = $(this)
        .find("img")
        .attr("src");
      var iurl = $(this)
        .find("img")
        .eq(1)
        .attr("src");
      var aurl =
        "https://twitter.com" +
        $(this)
          .find("a")
          .attr("href");
      var lol = $(this).html();
      //  res.write("user : " + name);
      //  res.write("tweet : " + tweet);
      console.log(profileimg);
      console.log(iurl);
      var t = {
        autor: name,
        tweet: tweet,
        piurl: profileimg,
        url: aurl,
        iurl: iurl
      };
      tweets.push(t);
    });
  });
  res.json(tweets);
});

module.exports = router;
