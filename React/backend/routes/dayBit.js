var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

router.get("/dayBit", async (req, res, next) => {
  var monthly = await getDaily();
  res.json(monthly);
});

//get daily window per minute
async function getDaily() {
  const response = await fetch(
    "https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&?format=json"
  );

  var data = await response.json();
  return data;
}

module.exports = router;
