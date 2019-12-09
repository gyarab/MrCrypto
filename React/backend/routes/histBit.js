var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const fs = require("fs");
const moment = require("moment");

router.get("/histBit", async (req, res, next) => {
  var recent = await getRecent();

  var file = await JSON.parse(
    fs.readFileSync("./src/historicalBitcoinPrice.json")
  );

  for (var k in recent.bpi) {
    file.bpi[k] = recent.bpi[k];
  }

  res.json(file);
});

//get recent data --from coindesk
async function getRecent() {
  var previous = moment().subtract(4, "days");
  var formatted = previous.format("YYYY-MM-DD");

  const response = await fetch(
    "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-11-27&end=" +
      formatted
  );

  var data = await response.json();
  return data;
}

module.exports = router;
