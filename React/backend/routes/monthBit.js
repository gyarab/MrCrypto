var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const moment = require("moment");

router.get("/monthBit", async (req, res, next) => {
  var monthly = await getMonthly();
  var scraped = [];

  for (x in monthly) {
    var date = moment.unix(x[0]).format("YYYY-MM-DD h");
    console.log(x[1]);
    scraped.push({ average: x[2], time: date });
  }

  res.json(scraped);
});

//get monthly window per hour
async function getMonthly() {
  const url = "https://api-pub.bitfinex.com/v2/";
  const pathParams = "candles/trade:1h:tBTCUSD/hist";
  const queryParams = "";

  const response = await fetch(`${url}/${pathParams}?${queryParams}`);
  var data = await response.json();
  return data;
}

module.exports = router;
