const moment = require("moment");
const merger = require("./merger");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";

async function start() {
  try {
    //get..
    let all = await merger.get(moment(1442966400000), 86400), //ALL, daily
      month = await merger.get(moment().subtract(30, "days"), 21600), //MONTH, every 6 hours
      day = await merger.get(moment().subtract(1, "days"), 900), //DAY, every 15 minutes
      hour = await merger.get(moment().subtract(1, "hours"), 60); //HOUR, every minute

    //save..
    let obj = [
      { _id: "all", all },
      { _id: "month", month },
      { _id: "day", day },
      { _id: "hour", hour }
    ];

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      assert.equal(null, err);

      const db = client.db(dbName);
      const c = db.collection(dbCollection);

      //dropping older collection prevents errors
      try {
        c.drop((err, ok) => {
          if (err) console.log("_SKIPPING DROPPING");
          if (ok) console.log("_OLDER COLLECTION DROPPED");
        });
      } catch {}

      c.insertMany(obj, (err, result) => {
        assert.equal(err, null); //inserted
        console.info("_CANDLES SAVED");
        client.close();
      });
    });
    console.info("_PROCURING DATA DONE");
  } catch (err) {
    console.error("_PROCURING DATA ERROR : " + err);
  }
}

module.exports = {
  start
};
