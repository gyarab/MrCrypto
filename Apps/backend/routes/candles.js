var express = require("express");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "mrcrypto";
const dbCollection = "candles";

//prices, sma, ema, bob, neural
function response(_id, res) {
  MongoClient.connect(
    url,
    { useUnifiedTopology: true },
    async (err, client) => {
      assert.equal(null, err);

      const db = client.db(dbName);
      const c = db.collection(dbCollection);

      let data = await c.findOne({ _id });

      res.send(JSON.stringify(data));
    }
  );
}

router.get("/candles", (req, res, next) => {
  response(req.query.key, res);
});

module.exports = router;
