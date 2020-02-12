const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";

var sma = require("./strategies/sma.js");
var bob = require("./strategies/bob.js");
var ema = require("./strategies/ema.js");
var atr = require("./strategies/atr.js");
var elr = require("./strategies/elr.js");
var macd = require("./strategies/macd.js");

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

            let elr_s = {
              _id: "elr",
              all: elr.calculate(all),
              month: elr.calculate(month),
              day: elr.calculate(day),
              hour: elr.calculate(hour)
            };

            let macd_s = {
              _id: "macd",
              all: macd.calculate(all),
              month: macd.calculate(month),
              day: macd.calculate(day),
              hour: macd.calculate(hour)
            };


            //calculated object to save
            let obj = [sma_s, bob_s, ema_s, elr_s, macd_s];

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
