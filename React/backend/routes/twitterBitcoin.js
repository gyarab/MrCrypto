var express = require("express");
var router = express.Router();

const rp = require("request-promise");
var URL = "https://twitter.com/BTCTN";
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
      var lol = $(this).html();
      console.log("user : " + name); //name of the user
      console.log("tweet : " + tweet); //tweet content
      //  res.write("user : " + name);
      //  res.write("tweet : " + tweet);
      var t = {
        title: "title",
        tweet: tweet,
        autor: name,
        imgUrl: "picture",
        url: "url"
      };
      tweets.push(t);
    });
  });
  res.json(tweets);
});

module.exports = router;
