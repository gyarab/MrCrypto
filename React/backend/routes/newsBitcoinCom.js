var express = require("express");
var router = express.Router();

const rp = require("request-promise");
const url = "https://news.bitcoin.com/";
const $ = require("cheerio");

router.get("/news", async function(req, res, next) {
  var v1,
    v2,
    v3 = null;

  await rp(url).then(html => {
    v1 = $(".story.story--huge", html)
      .find("a")
      .find("h5")
      .text()
      .trim();

    v2 = $(".story.story--huge", html)
      .find("a")
      .find("img")
      .attr("src");
    v3 = $(".story.story--huge", html)
      .find("a")
      .attr("href");
  });

  var articles = [];

  var article = { title: v1, imgUrl: v2, url: v3 };
  var article2 = { title: "example", imgUrl: "example", url: "example" };

  articles.push(article);
  articles.push(article2);

  res.json(articles);
});

module.exports = router;
