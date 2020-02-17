const fetch = require("node-fetch");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  async get() {
    var recent = await getRecent();

    var file = await JSON.parse(
      fs.readFileSync("./src/data/historicalBitcoinPrice.json")
    );

    result = [];

    //from file
    let x = 0;
    for (var k in file.bpi) {
      if (x % 7 == 0) {
        result.push([
          parseInt(moment(k, "YYYY-MM-DD").format("X")),
          "null",
          "null",
          "null",
          file.bpi[k],
          "null"
        ]);
      }
      x++;
    }

    //from recent
    for (var k in recent.bpi) {
      if (x % 7 == 0) {
        result.push([
          parseInt(moment(k, "YYYY-MM-DD").format("X")),
          "null",
          "null",
          "null",
          recent.bpi[k],
          "null"
        ]);
      }
      x++;
    }

    return result;
  }
};
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
