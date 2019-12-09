const express = require("express");
const app = express();
const fetch = require("node-fetch");
const fs = require("fs");
var moment = require("moment");
const port = 3001;

var historicalData = null;

app.get("/getall", async (req, res, next) => {
  var data = await get();

  for (var k in data.bpi) {
    historicalData.bpi[k] = data.bpi[k];
  }

  res.json(historicalData);
});

//get as much from download (historical) to today as posible
async function get() {
  var previous = moment().subtract(4, "days");
  var formatted = previous.format("YYYY-MM-DD");

  const response = await fetch(
    "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-11-27&end=" +
      formatted
  );

  var data = await response.json();
  return data;
}

//get historical data
fs.readFile("./src/historicalBitcoinPrice.json", (err, data) => {
  //to 2019-11-26>
  if (data) {
    historicalData = JSON.parse(data);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
