var express = require("express");
var router = express.Router();

const rp = require("request-promise");
var URL = "https://twitter.com/search?q=Bitcoin&src=typeahead_click";
const $ = require("cheerio");

router.get("/twitter", async function(req, res, next) {
  var tweets = [];
  await rp(URL).then(html => {
    ht = $("li.stream-item", html).each(function(index) {
      var images = [];
      var x = 0;
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
        .each(function(index) {
          var i = $(this).attr("src");

          if (i.includes("/emoji/") || i.includes("/profile_images/")) {
          } else {
            images[x] = i;
            x++;
          }
        });
      var aurl =
        "https://twitter.com" +
        $(this)
          .find("a")
          .attr("href");
      var t = {
        autor: name,
        tweet: tweet,
        piurl: profileimg,
        url: aurl,
        iurl: images
      };
      tweets.push(t);
    });
  });
  res.json(tweets);
});

module.exports = router;
