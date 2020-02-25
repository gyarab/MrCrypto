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
            console.log("lets run neural network");
            nn.calculate(prices.month);

            //data to calculate
            //let hour = await nn.calculate(prices.hour);
            // let day = await nn.calculate(prices.day);
            // let month = await nn.calculate(prices.month);
            //let all = await nn.calculate(prices.all);

            //calculated object to save
            let obj = [{ something: "ahao" }];

            c.insertMany(obj, (err, result) => {
              assert.equal(err, null);
              console.info("_NEURAL SAVED");
              client.close();
            });
          });
      }
    );
  } catch (err) {
    console.error("_NEURAL_ERROR: " + err);
    start();
  }
}

module.exports = { start };
