const moment = require("moment");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017",
  dbName = "mrcrypto",
  dbCollection = "candles";
var nn = require("./neuralNetwork.js");
var firstTime = true;
function start(data) {
  try {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 },
      (err, client) => {
        if (err) throw err;

        const db = client.db(dbName);
        const c = db.collection(dbCollection);

        result = nn.calculate(data);

        //calculated object to save
        let obj = [{ _id: "neural", data: result }];
        if (firstTime) {
          c.insertMany(obj, (err, result) => {});
          firstTime = false;
          console.info("_NEURAL_SAVED");
        } else {
          c.updateOne(
            { _id: "neural" },
            {
              $set: { data: data }
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
