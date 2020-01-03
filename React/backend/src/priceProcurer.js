const moment = require("moment");
const merger = require("./merger");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "mrcrypto";

async function includeAll() {
  try {
    //get
    let all = await merger.get(moment(1442966400000), 86400); //ALL, (daily)
    let month = await merger.get(moment().subtract(30, "days"), 21600); //MONTH, every 6 hours
    let day = await merger.get(moment().subtract(1, "days"), 900); //DAY, every 15 minutes
    let hour = await merger.get(moment().subtract(1, "hours"), 60); //HOUR, every minute

    //save
    let obj = [{ all }, { month }, { day }, { hour }];

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      assert.equal(null, err);
      console.log("Connected to MongoDB server");

      const db = client.db(dbName);

      saveData(obj, db, () => {
        client.close();
      });
    });

    console.log("PROCURING ALL DONE");
  } catch (err) {
    console.log("PROCURING ALL ERROR : " + err);
  }
}

function saveData(obj, db, callback) {
  const collection = db.collection("prices");

  collection.insertMany(obj, (err, result) => {
    assert.equal(err, null);
    console.log("SAVING DONE");
    callback(result);
  });
}

module.exports = {
  start() {
    includeAll();
  },
  update() {}
};
