var express = require("express");
var router = express.Router();

const request = require("request-promise");
const cheerio = require("cheerio");
const URL = "https://www.reddit.com/search/?q=bitcoin&sort=top&t=month";

router.get("/reddit", (req, res, next) => {
  request(URL, (error, response, html) => {
    let output = [];

    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      let scraped = [];

      $("._2XDITKxlj4y3M99thqyCsO").each((i, el) => {
        if (i == 15) {
          return false;
        }
        //Title
        var sTitle = $(el)
          .find(".SQnoC3ObvgnGjWt90zD9Z")
          .text();

        //Image
        var imgDiv = $(el)
          .find("._2c1ElNxHftd8W_nZtcG9zf")
          .attr("style");

        var l = imgDiv.indexOf("(") + 1;
        var r = imgDiv.indexOf(")");

        var sImgUrl = imgDiv.slice(l, r);
        sImgUrl = sImgUrl.includes("border-color") ? undefined : sImgUrl; //it could be just empty background

        //Url
        var sUrl =
          "www.reddit.com" +
          $(el)
            .find(".SQnoC3ObvgnGjWt90zD9Z")
            .attr("href");

        scraped.push({
          title: sTitle,
          imgUrl: sImgUrl,
          url: sUrl
        });
      });
      res.json(scraped);
    }
  });
});

module.exports = router;
