var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.end("MrCrypto API");
});

module.exports = router;
