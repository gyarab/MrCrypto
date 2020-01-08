const CoinbasePro = require("coinbase-pro");
const publicClient = new CoinbasePro.PublicClient();

const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";

function start(_id, interval, granularity) {
  let pointer = moment().subtract(100, "seconds"),
    slot,
    params = {
      start: null,
      end: null,
      granularity
    };

  setInterval(() => {
    params.start = pointer.toISOString();
    params.end = moment()
      .add(100, "seconds")
      .toISOString();
    pointer = moment().subtract(100, "seconds");
    MongoClient.connect(
      url,
      { useUnifiedTopology: true },
      async (err, client) => {
        assert.equal(null, err);

        const db = client.db(dbName);
        const c = db.collection(dbCollection);
        slot = await publicClient.getProductHistoricRates("BTC-USD", params);
        await console.log("params: " + JSON.stringify(params));
        console.log("1.." + slot);

        c.findOneAndUpdate(
          { _id },
          { $push: { data: slot } },
          { safe: true, upsert: true },
          (err, doc) => {
            assert.equal(null, err);
            console.log("2.." + slot);
            console.log("UPDATED_" + _id);
          }
        );
      }
    );
    console.log("3.." + slot);
  }, interval * 1000);
}
module.exports = { start };
