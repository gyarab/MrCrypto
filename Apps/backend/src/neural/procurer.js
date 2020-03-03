const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";
var nn = require("./neuralNetwork.js");
var firstTime = true;
function start(data, hotData) {
  try {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 },
      async (err, client) => {
        if (err) throw err;

        const db = client.db(dbName);
        const c = db.collection(dbCollection);

        results = await nn.calculate(data, hotData);

        //calculated object to save
        let obj = [
          {
            _id: "neural",
            data: results.data,
            percentage: results.percentage
          }
        ];

        if (firstTime) {
          c.insertMany(obj, (err, result) => {});
          firstTime = false;
          console.info("_NEURAL_SAVED");
        } else {
          c.updateOne(
            { _id: "neural" },
            {
              $set: { data: results.data, percentage: results.percentage }
            }
          );
          console.info("_NEURAL_UPDATED");
        }
      }
    );
  } catch (err) {
    console.error("_NEURAL_ERROR: " + err);
    start();
  }
}

module.exports = { start };
