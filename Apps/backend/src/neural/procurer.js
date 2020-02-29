const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";
var nn = require("./neuralNetwork.js");

function start() {
  try {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 },
      (err, client) => {
        if (err) throw err;

        client
          .db(dbName)
          .collection(dbCollection)
          .find({})
          .toArray(async (err, data) => {
            if (err) throw err;

            const db = client.db(dbName);
            const c = db.collection(dbCollection);

            let prices = data.find(obj => obj._id == "prices");
            nn.calculate(prices.all);
            let something = "newData";
            //calculated object to save
            let obj = [{ _id: "neural", data: "ahao" }];
            try {
              c.insertMany(obj, (err, result) => {
                assert.equal(err, null);
                client.close();
              });
            } catch {
              c.updateOne(
                { _id: "neural" },
                {
                  $set: { data: something }
                }
              );
            }
          });
      }
    );
  } catch (err) {
    console.error("_NEURAL_ERROR: " + err);
    start();
  }
}

module.exports = { start };
