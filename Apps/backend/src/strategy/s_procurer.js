const moment = require("moment");
const updater = require("./updater");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "strategy";
var ma = require('./strategies/moving_avarage.js');
async function start() {
  try {
    //get..
    var hour = [];
    var day = [];
    var month = [];
    var all = [];
    MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) throw err;

      client
        .db("mrcrypto")
        .collection("candles")
        .find({})
        .toArray((err, data) => {
          if (err) throw err;

        var obj = [
          { _id: "movingAvarage", data: ma },
          { _id: "....", data: .... },
          { _id: "....", data: .... },
          { _id: "....", data: .... }
        ];


      const db = client.db(dbName);
      const c = db.collection(dbCollection);

      //dropping older collection prevents errors
      try {
        c.drop((err, ok) => {
          if (err) console.log("_SKIPPING STRATEGY DROPPING");
          if (ok) console.log("_OLDER STRATEGY DROPPED");
        });
      } catch {}

      c.insertMany(obj, (err, result) => {
        assert.equal(err, null);
        console.info("_NEW STRATEGY SAVED");
        //after saving run updating services
        updater.start("hour", 60, 60);
        updater.start("day", 15 * 60, 900);
        updater.start("month", 6 * 3600, 21600);
        updater.start("all", 24 * 3600, 86400);
        client.close();
      });
    });
    });
  } catch (err) {
    console.error("_STRATEGY HANDLING ERROR: " + err);
    start();
  }
}

module.exports = { start };
