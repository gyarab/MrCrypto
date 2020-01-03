const moment = require("moment");
const merger = require("./merger");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "mrcrypto";
const dbCollection = "prices";

async function start() {
  try {
    //get
    let all = await merger.get(moment(1442966400000), 86400); //ALL, (daily)
    let month = await merger.get(moment().subtract(30, "days"), 21600); //MONTH, every 6 hours
    let day = await merger.get(moment().subtract(1, "days"), 900); //DAY, every 15 minutes
    let hour = await merger.get(moment().subtract(1, "hours"), 60); //HOUR, every minute

    //save
    let obj = [{ all }, { month }, { day }, { hour }];

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      assert.equal(null, err); //connected...
      const db = client.db(dbName);
      const collection = db.collection(dbCollection);

      collection.insertMany(obj, (err, result) => {
        assert.equal(err, null); //inserted
        console.info("SAVING DATA DONE");
        client.close();
      });
    });

    console.info("PROCURING DATA DONE");
  } catch (err) {
    console.error("PROCURING DATA ERROR : " + err);
  }
}

module.exports = {
  start
};
