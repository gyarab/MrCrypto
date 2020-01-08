var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.send("MrCrypto backend");
});

module.exports = router;
