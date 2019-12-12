var express = require("express");
var router = express.Router();

const rp = require("request-promise");
const url1 = "https://news.bitcoin.com/";
const url2 = 'https://www.wired.com/search/?q=bitcoin&page=1&sort=score';
const url3 = 'https://cryptonews.com/news/bitcoin-news/';
const $ = require("cheerio");

router.get("/news", async function(req, res, next) {
  var v11,
      v12,
      v13 = null,
      v21,
      v22,
      v23 = null,
      v31,
      v32,
      v33 = null,
      v41,
      v42,
      v43 = null,
      v51,
      v52,
      v53 = null,
      v61,
      v62,
      v63 = null;

  await rp(url1).then(html => {
    v11 = $(".story.story--huge", html).find('a').find('img').attr('alt');
    v12 = $(".story.story--huge", html).find("a").find("img").attr("src");
    v13 = $(".story.story--huge", html).find("a").attr("href");
    v21 = $(".td_block_inner.td-column-1.td-opacity-author", html).find('a').find('img').attr('alt');
    v22 = $(".td_block_inner.td-column-1.td-opacity-author", html).find("a").find("img").attr("src");
    v23 = $(".td_block_inner.td-column-1.td-opacity-author", html).find("a").attr("href");
  });
  await rp(url2).then(html => {
    v31 = $('.archive-item-component', html).find("a").find('h2').eq(0).text();
    v32 =  $("li:nth-child(1)", html).find("a").find("img").attr("src");
    v33 = 'https://www.wired.com'+ $(".archive-item-component__link", html).eq(1).attr('to');
    v41 = $('.archive-item-component', html).find("a").find('h2').eq(1).text();
    v42 = $("li:nth-child(2)", html).find("a").find("img").attr("src");
    v43 =  'https://www.wired.com'+ $(".archive-item-component__link", html).eq(2).attr('to');

  });
  await rp(url3).then(html => {
    v51 = $('.cn-tile.article', html).find('h4').eq(0).text();
    v52 = $(".cn-news-grid", html).find("a").eq(0).find("img").attr("data-src");
    v53 =  "https://cryptonews.com" +$(".cn-tile.article", html).find("a").eq(0).attr("href");
    v61 = $(".cn-tile.article", html).find("h4").eq(1).text();
    v62 = $(".cn-news-grid", html).find("a").eq(3).find("img").attr("data-src");
    v63 =  "https://cryptonews.com" +$(".cn-tile.article", html).find("a").eq(3).attr("href");
  });

  var articles = [];

  var article1 = { title: v11, imgUrl: v12, url: v13 };
  var article2 = { title: v21, imgUrl: v22, url: v23 };
  var article3 = { title: v31, imgUrl: v32, url: v33 };
  var article4 = { title: v41, imgUrl: v42, url: v43 };
  var article5 = { title: v51, imgUrl: v52, url: v53 };
  var article6 = { title: v61, imgUrl: v62, url: v63 };
  articles.push(article1);
  articles.push(article2);
  articles.push(article3);
  articles.push(article4);
  articles.push(article5);
  articles.push(article6);
  res.json(articles);
});

module.exports = router;
