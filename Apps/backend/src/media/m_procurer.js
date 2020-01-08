const rp = require("request-promise");
const urlt = "https://twitter.com/search?q=Bitcoin&src=typeahead_click";
const URL = "https://www.reddit.com/search/?q=bitcoin&sort=top&t=month";
const url1 = "https://news.bitcoin.com/";
const url2 = "https://www.wired.com/search/?q=bitcoin&page=1&sort=score";
const url3 = "https://cryptonews.com/news/bitcoin-news/";
const url4 = "https://www.aljazeera.com/topics/subjects/bitcoin.html";
const url5 = "https://bitcoinmagazine.com/search?text=bitcoin&page=1";
const url6 = "https://www.newsbtc.com/?s=bitcoin&lang=en";
const $ = require("cheerio");
const moment = require("moment");
const updater = require("./updater");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "media";

async function start() {
  try {
    //get NEWS
//
    let v = [];
    let articles = [];
//NOVINKY 1
    await rp(url1).then(html => {
      v[0] = $(".story.story--huge", html)
        .find("a")
        .find("img")
        .attr("alt");
      v[1] = $(".story.story--huge", html)
        .find("a")
        .find("img")
        .attr("src");
      v[2] = $(".story.story--huge", html)
        .find("a")
        .attr("href");
      v[3] = $(".td_block_inner.td-column-1.td-opacity-author", html)
        .find("a")
        .find("img")
        .attr("alt");
      v[4] = $(".td_block_inner.td-column-1.td-opacity-author", html)
        .find("a")
        .find("img")
        .attr("src");
      v[5] = $(".td_block_inner.td-column-1.td-opacity-author", html)
        .find("a")
        .attr("href");
      var article1 = { title: v[0], imgUrl: v[1], url: v[2] };
      var article2 = { title: v[3], imgUrl: v[4], url: v[5] };
      articles.push(article1);
      articles.push(article2);
    });
    //NOVINKY 2
    await rp(url2).then(html => {
      v[6] = $(".archive-item-component", html)
        .find("a")
        .find("h2")
        .eq(0)
        .text();
      v[7] = $("li:nth-child(1)", html)
        .find("a")
        .find("img")
        .attr("src");
      v[8] =
        "https://www.wired.com" +
        $(".archive-item-component__link", html)
          .eq(1)
          .attr("to");
      v[9] = $(".archive-item-component", html)
        .find("a")
        .find("h2")
        .eq(1)
        .text();
      v[10] = $("li:nth-child(2)", html)
        .find("a")
        .find("img")
        .attr("src");
      v[11] =
        "https://www.wired.com" +
        $(".archive-item-component__link", html)
          .eq(2)
          .attr("to");
      var article3 = { title: v[6], imgUrl: v[7], url: v[8] };
      var article4 = { title: v[9], imgUrl: v[10], url: v[11] };
      articles.push(article3);
      articles.push(article4);
    });
    //NOVINKY 3
    await rp(url3).then(html => {
      v[12] = $(".cn-tile.article", html)
        .find("h4")
        .eq(0)
        .text();
      v[13] = $(".cn-news-grid", html)
        .find("a")
        .eq(0)
        .find("img")
        .attr("data-src");
      v[14] =
        "https://cryptonews.com" +
        $(".cn-tile.article", html)
          .find("a")
          .eq(0)
          .attr("href");
      v[15] = $(".cn-tile.article", html)
        .find("h4")
        .eq(1)
        .text();
      v[16] = $(".cn-news-grid", html)
        .find("a")
        .eq(3)
        .find("img")
        .attr("data-src");
      v[17] =
        "https://cryptonews.com" +
        $(".cn-tile.article", html)
          .find("a")
          .eq(3)
          .attr("href");
      var article5 = { title: v[12], imgUrl: v[13], url: v[14] };
      var article6 = { title: v[15], imgUrl: v[16], url: v[17] };
      articles.push(article5);
      articles.push(article6);
    });
    //NOVINKY 4
    await rp(url4).then(html => {
      v[18] = $(".col-md-6.middleEast-feature-section-lt.default-style", html)
        .find("a")
        .find("img")
        .attr("alt");
      v[19] =
        "https://www.aljazeera.com" +
        $(".col-md-6.middleEast-feature-section-lt.default-style", html)
          .find("a")
          .find("img")
          .attr("src");
      v[20] =
        "https://www.aljazeera.com" +
        $(".col-md-6.middleEast-feature-section-lt.default-style", html)
          .find("a")
          .attr("href");
      v[21] = $(".top-section-rt-s1 ", html)
        .find("a")
        .find("img")
        .attr("alt");
      v[22] =
        "https://www.aljazeera.com" +
        $(".top-section-rt-s1 ", html)
          .find("a")
          .find("img")
          .attr("src");
      v[23] =
        "https://www.aljazeera.com" +
        $(".top-section-rt-s1 ", html)
          .find("a")
          .attr("href");
      var article7 = { title: v[18], imgUrl: v[19], url: v[20] };
      var article8 = { title: v[21], imgUrl: v[22], url: v[23] };
      articles.push(article7);
      articles.push(article8);
    });
    //NOVINKY 5
    await rp(url5).then(html => {
      v[24] = $("._3P0fPUYULfBPF2lcLaKVBV", html)
        .eq(0)
        .find("a")
        .find("h3")
        .text();
      v[25] = $("div:nth-child(1)", html)
        .find("img")
        .attr("src");
      v[26] =
        "https://bitcoinmagazine.com" +
        $("._3P0fPUYULfBPF2lcLaKVBV", html)
          .eq(0)
          .find("a")
          .attr("href");
      v[27] = $("._3P0fPUYULfBPF2lcLaKVBV", html)
        .eq(1)
        .find("a")
        .find("h3")
        .text();
      v[28] = $("div:nth-child(2)", html)
        .find("img")
        .attr("src");
      v[29] =
        "https://bitcoinmagazine.com" +
        $("._3P0fPUYULfBPF2lcLaKVBV", html)
          .eq(1)
          .find("a")
          .attr("href");
      var article9 = { title: v[24], imgUrl: v[25], url: v[26] };
      var article10 = { title: v[27], imgUrl: v[28], url: v[29] };
      articles.push(article9);
      articles.push(article10);
    });
    //NOVINKY 6
    await rp(url6).then(html => {
      v[30] = $("li:nth-child(1)", html)
        .find("article")
        .find("h2")
        .text();
      v[31] = $("li:nth-child(1)", html)
        .find("article")
        .find("a")
        .find("img")
        .attr("data-cfsrc");
      v[32] = $("li:nth-child(1)", html)
        .find("article")
        .find("a")
        .attr("href");
      v[33] = $("li:nth-child(2)", html)
        .find("article")
        .find("h2")
        .text();
      v[34] = $("li:nth-child(2)", html)
        .find("article")
        .find("a")
        .find("img")
        .attr("data-cfsrc");
      v[35] = $("li:nth-child(2)", html)
        .find("article")
        .find("a")
        .attr("href");
      var article11 = { title: v[30], imgUrl: v[31], url: v[32] };
      var article12 = { title: v[33], imgUrl: v[34], url: v[35] };
      articles.push(article11);
      articles.push(article12);
    });
    /*TWITTER*/
//
    var tweets = [];
    await rp(urlt).then(html => {
      //scraping tweets
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
        //tweet contains image (in the end) so we need to find the breaking point
        var index = tweet.indexOf("pic.twitter.com");

        var t = {
          autor: name,
          title: tweet.slice(0, index),
          imgUrl: profileimg,
          url: "https://" + tweet.slice(index)
        };
        tweets.push(t);
      });
    });
/*REDDIT*/
  var scraped = [];
await rp(URL).then(html => {

 let output = [];
//scraping reddit posts
ht = $("._2XDITKxlj4y3M99thqyCsO", html).each((i, el) => {
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

      //Autor
      var sAutor = $(el)
        .find("._3ryJoIoycVkA88fy40qNJc")
        .text();

      //Url
      var sUrl =
        "https://www.reddit.com" +
        $(el)
          .find(".SQnoC3ObvgnGjWt90zD9Z")
          .attr("href");

      scraped.push({
        autor: sAutor,
        title: sTitle,
        imgUrl: sImgUrl,
        url: sUrl
      });
    });

});
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      assert.equal(null, err);

      const db = client.db(dbName);
      const c = db.collection(dbCollection);

      //dropping older collection prevents errors
      try {
        c.drop((err, ok) => {
          if (err) console.log("_SKIPPING DROPPING");
          if (ok) console.log("_OLDER COLLECTION DROPPED");
        });
      } catch {}

      c.insertMany([{_id:"news", data: articles},{_id:"twitter", data: tweets},{_id:"reddit", data: scraped}], (err, result) => {
        assert.equal(err, null);
        console.info("_NEW MEDIA SAVED");
        //after saving run updating services
        updater.start("news", 3600);
        updater.start("twitter", 3600);
        updater.start("reddit", 3600);
        client.close();

      });
    });
    console.info("_PROCURING DATA DONE");
  } catch (err) {
    console.error("_PROCURING DATA ERROR : " + err);
  }
}

module.exports = {
  start
};
