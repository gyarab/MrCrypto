const moment = require("moment");
const getter = require("./getter");
const historicalGetter = require("./historicalGetter");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";

async function start(callback, callback2) {
  init(callback, callback2);

  setInterval(async () => {
    let hour = await getter.get(moment().subtract(1, "hours"), 60);
    update("hour", hour);
    callback();
  }, 60 * 1000);
  setInterval(async () => {
    let day = await getter.get(moment().subtract(1, "days"), 900);
    update("day", day);
    callback();
  }, 15 * 60 * 1000);
  setInterval(async () => {
    let month = await getter.get(moment().subtract(30, "days"), 21600);
    update("month", month);
    callback();
  }, 60 * 60 * 1000 * 6);
  setInterval(async () => {
    let all = await historicalGetter.get();
    let month = await getter.get(moment().subtract(30, "days"), 21600);
    update("all", all);
    callback();
    callback2(all, month);
  }, 60 * 60 * 1000 * 24);
}
function update(period, data) {
  try {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true, poolSize: 10 },
      (err, client) => {
        assert.equal(null, err);

        const db = client.db(dbName);
        const c = db.collection(dbCollection);

        c.updateOne(
          { _id: "prices" },
          {
            $set: { [period]: data }
          }
        );
      }
    );
  } catch {
    console.log("update error");
  }
}

async function init(callback, callback2) {
  try {
    //get..
    let all = await historicalGetter.get(), //ALL, daily
      month = await getter.get(moment().subtract(30, "days"), 21600), //MONTH, every 6 hours
      day = await getter.get(moment().subtract(1, "days"), 900), //DAY, every 15 minutes
      hour = await getter.get(moment().subtract(1, "hours"), 60); //HOUR, every minute

    //save..
    let obj = [{ _id: "prices", all, month, day, hour }];

    MongoClient.connect(
      url,
      { useUnifiedTopology: true, poolSize: 10 },
      (err, client) => {
        assert.equal(null, err);

        const db = client.db(dbName);
        const c = db.collection(dbCollection);

        //dropping older collection prevents errors
        try {
          c.drop((err, ok) => {
            if (err) console.log("_SKIPPING CANDLES DROPPING");
          });
        } catch {}

        c.insertMany(obj, (err, result) => {
          assert.equal(err, null);
          console.info("_NEW CANDLES SAVED");
          //lets calculate
          callback();
          //callback2(all, month);
        });
      }
    );
  } catch (err) {
    console.error("_CANDLES HANDLING ERROR: " + err);
    start();
  }
}

module.exports = { start };
