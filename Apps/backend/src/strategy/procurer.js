const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";

var sma = require("./strategies/sma.js");
var bob = require("./strategies/bob.js");
var ema = require("./strategies/ema.js");
var tma = require("./strategies/tma.js");
var wma = require("./strategies/wma.js");
function start() {
  try {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 },
      (err, client) => {
        if (err) throw err;

        client
          .db(dbName)
          .collection(dbCollection)
          .find({})
          .toArray(async (err, data) => {
            if (err) throw err;

            const db = client.db(dbName);
            const c = db.collection(dbCollection);

            let prices = data.find(obj => obj._id == "prices");

            //data to calculate
            let hour = prices.hour;
            let day = prices.day;
            let month = prices.month;
            let all = prices.all;

            let sma_s = {
              _id: "sma",
              all: sma.calculate(all),
              month: sma.calculate(month),
              day: sma.calculate(day),
              hour: sma.calculate(hour)
            };

            let bob_s = {
              _id: "bob",
              all: bob.calculate(all),
              month: bob.calculate(month),
              day: bob.calculate(day),
              hour: bob.calculate(hour)
            };

            let ema_s = {
              _id: "ema",
              all: ema.calculate(all),
              month: ema.calculate(month),
              day: ema.calculate(day),
              hour: ema.calculate(hour)
            };

            let tma_s = {
              _id: "tma",
              all: tma.calculate(all),
              month: tma.calculate(month),
              day: tma.calculate(day),
              hour: tma.calculate(hour)
            };

            let wma_s = {
              _id: "wma",
              all: wma.calculate(all),
              month: wma.calculate(month),
              day: wma.calculate(day),
              hour: wma.calculate(hour)
            };
            //calculated object to save
            let obj = [sma_s, bob_s, ema_s, tma_s, wma_s];

            c.insertMany(obj, (err, result) => {
              assert.equal(err, null);
              console.info("STRATEGIES SAVED");
              client.close();
            });
          });
      }
    );
  } catch (err) {
    console.error("STRATEGIES_ERROR: " + err);
    start();
  }
}

module.exports = { start };
