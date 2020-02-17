const moment = require("moment");
const getter = require("./getter");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "trends";

async function start() {
  try {
    //get..
    let all = await getter.get(moment("2010-07-18", "YYYY-MM-DD")),
      month = await getter.get(moment().subtract(30, "days")),
      day = await getter.get(moment().subtract(1, "days")),
      hour = await getter.get(moment().subtract(1, "hours"));

    //save..
    let obj = [{ _id: "googletrends", all, month, day, hour }];

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
            if (err) console.log("_SKIPPING TRENDS DROPPING");
            if (ok) console.log("_OLDER TRENDS DROPPED");
          });
        } catch {}

        c.insertMany(obj, (err, result) => {
          assert.equal(err, null);
          console.info("_NEW TRENDS SAVED");

          client.close();
        });
      }
    );
  } catch (err) {
    console.error("_TRENDS HANDLING ERROR: " + err);
    start();
  }
}

module.exports = { start };
