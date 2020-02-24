const moment = require("moment");
const getter = require("./getter");
const historicalGetter = require("./historicalGetter");
const updater = require("./updater");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";

async function start(callback, callback2) {
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
            if (ok) console.log("_OLDER CANDLES DROPPED");
          });
        } catch {}

        c.insertMany(obj, (err, result) => {
          assert.equal(err, null);
          console.info("_NEW CANDLES SAVED");
          callback(); //lets calculate
          callback2();

          /**after saving run updating services
        updater.start("hour", 60, 60);
        updater.start("day", 15 * 60, 900);
        updater.start("month", 6 * 3600, 21600);
        updater.start("all", 24 * 3600, 86400);
        **/

          client.close();
        });
      }
    );
  } catch (err) {
    console.error("_CANDLES HANDLING ERROR: " + err);
    start();
  }
}

module.exports = { start };
