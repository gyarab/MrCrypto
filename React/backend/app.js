const express = require("express");
const app = express();
const port = 3001;

const index = require("./routes/index");

const histBit = require("./routes/histBit");
const monthBit = require("./routes/monthBit");
const dayBit = require("./routes/dayBit");

const news = require("./routes/newsBitcoinCom");
const twitter = require("./routes/twitterBitcoin");
const reddit = require("./routes/redditBitcoin");

app.use(index);

//bitcoin prices
app.use(histBit);
app.use(monthBit);
app.use(dayBit);

//media
app.use(news);
app.use(twitter);
app.use(reddit);

app.listen(port, () =>
  console.log(`MrCrypto-Express listening on port ${port}!`)
);
