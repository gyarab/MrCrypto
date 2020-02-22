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
              all: sma.calculate(all,true),
              month: sma.calculate(month,false),
              day: sma.calculate(day,false),
              hour: sma.calculate(hour,false)
            };

            let bob_s = {
              _id: "bob",
              all: bob.calculate(all,true),
              month: bob.calculate(month,false),
              day: bob.calculate(day,false),
              hour: bob.calculate(hour,false)
            };

            let ema_s = {
              _id: "ema",
              all: ema.calculate(all,true),
              month: ema.calculate(month,false),
              day: ema.calculate(day,false),
              hour: ema.calculate(hour,false)
            };

            let tma_s = {
              _id: "tma",
              all: tma.calculate(all,true),
              month: tma.calculate(month,false),
              day: tma.calculate(day,false),
              hour: tma.calculate(hour,false)
            };

            let wma_s = {
              _id: "wma",
              all: wma.calculate(all,true),
              month: wma.calculate(month,false),
              day: wma.calculate(day,false),
              hour: wma.calculate(hour,false)
            };
            //calculated object to save
            let obj = [sma_s, bob_s, ema_s, tma_s, wma_s];

            c.insertMany(obj, (err, result) => {
              assert.equal(err, null);
              console.info("_STRATEGIES SAVED");
              client.close();
            });
          });
      }
    );
  } catch (err) {
    console.error("_STRATEGIES_ERROR: " + err);
    start();
  }
}

module.exports = { start };
