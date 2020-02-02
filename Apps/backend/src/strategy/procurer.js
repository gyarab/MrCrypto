const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";
var sma = require("./strategies/sma.js");

function start() {
  try {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db(dbName)
          .collection(dbCollection)
          .find({})
          .toArray(async (err, data) => {
            if (err) throw err;

            //data to calculate
            let hour = data.find(obj => obj._id == "hour").data;
            let day = data.find(obj => obj._id == "day").data;
            let month = data.find(obj => obj._id == "month").data;
            let all = data.find(obj => obj._id == "all").data;

            const db = client.db(dbName);
            const c = db.collection(dbCollection);

            //calculated object to save
            let obj = [
              { _id: "sma_hour", data: sma.calculate(hour) },
              { _id: "sma_day", data: sma.calculate(day) },
              { _id: "sma_month", data: sma.calculate(month) },
              { _id: "sma_all", data: sma.calculate(all) }
            ];

            c.insertMany(obj, (err, result) => {
              assert.equal(err, null);
              console.info("_SMA SAVED");
              client.close();
            });
          });
      }
    );
  } catch (err) {
    console.error("_SMA ERROR: " + err);
    start();
  }
}

module.exports = { start };
