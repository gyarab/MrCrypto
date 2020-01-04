const express = require("express");
const app = express();
const port = 3001;

const index = require("./routes/index");

//get and update bitcoin price data
const procurer = require("./src/procurer");
procurer.start();

//import bitcoin prices
const candles = require("./routes/bitcoinCandles");

//import media
const news = require("./routes/newsBitcoinCom");
const twitter = require("./routes/twitterBitcoin");
const reddit = require("./routes/redditBitcoin");
app.use(index);

//bitcoin candles
app.use(candles);

//media
app.use(news);
app.use(twitter);
app.use(reddit);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
