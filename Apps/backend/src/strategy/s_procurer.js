const moment = require("moment");
const updater = require("./updater");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "strategy";

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

//MOVING AVARAGE
  //hour
var count = Object.keys(data[3].data).length;
        var cislo = [];

          var ma = 0;
          for (var i = 0; i < count; i++) {
          cislo[i] = data[3].data[i][4]
          if (i>=6) {
          for (var p = i-6; p <= i; p++) {
                    ma += cislo[p];
          }
          ma = ma/7;
          hour.push(ma);
          ma = 0;
          }
        }
  //day
  var count = Object.keys(data[2].data).length;
            cislo = [];
            ma = 0;
            for (var i = 0; i < count; i++) {
            cislo[i] = data[2].data[i][4]
            if (i>=6) {
            for (var p = i-6; p <= i; p++) {
                      ma += cislo[p];
            }
            ma = ma/7;
            day.push(ma);
            ma = 0;
            }
          }
  //month
  var count = Object.keys(data[1].data).length;
            cislo = [];
             ma = 0;
            for (var i = 0; i < count; i++) {
            cislo[i] = data[1].data[i][4]
            if (i>=6) {
            for (var p = i-6; p <= i; p++) {
                      ma += cislo[p];
            }
            ma = ma/7;
            month.push(ma);
            ma = 0;
            }
          }
  //all
  var count = Object.keys(data[0].data).length;
            cislo = [];
             ma = 0;
            for (var i = 0; i < count; i++) {
            cislo[i] = data[0].data[i][4]
            if (i>=6) {
            for (var p = i-6; p <= i; p++) {
                      ma += cislo[p];
            }
            ma = ma/7;
            all.push(ma);
            ma = 0;
            }
          }
  //SAVE...        
        var obj = [
          { _id: "all", data: all },
          { _id: "month", data: month },
          { _id: "day", data: day },
          { _id: "hour", data: hour }
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
