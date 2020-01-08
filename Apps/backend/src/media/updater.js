const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "media";

function start(_id, interval) {
  let pointer = moment();

  setInterval(() => {
    console.log(moment().format());
    MongoClient.connect(
      url,
      { useUnifiedTopology: true },
      async (err, client) => {
        assert.equal(null, err);

        const db = client.db(dbName);
        const c = db.collection(dbCollection);

        c.findOneAndUpdate(
          { _id },
          { $push: { data: ["SOMETHING"] } },
          { safe: true, upsert: true },
          (err, doc) => {
            assert.equal(null, err);
            console.log("PUSHED");
          }
        );
      }
    );
  }, interval * 1000);
}
module.exports = { start };
