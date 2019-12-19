var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

router.get("/monthBit", async (req, res, next) => {
  var monthly = await getMonthly();
  res.json(monthly);
});

//get monthly window per hour
async function getMonthly() {
  const response = await fetch(
    "https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=monthly&?format=json"
  );

  var data = await response.json();
  return data;
}

module.exports = router;
