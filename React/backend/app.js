const express = require("express");
const app = express();
const port = 3001;

const index = require("./routes/index");
const histBit = require("./routes/histBit");
const news = require("./routes/newsBitcoinCom");

app.use(index);
app.use(histBit);
app.use(news);

app.listen(port, () =>
  console.log(`MrCrypto-Express listening on port ${port}!`)
);
