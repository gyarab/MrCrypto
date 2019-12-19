const express = require("express");
const app = express();
const port = 3001;

const index = require("./routes/index");

const histBit = require("./routes/histBit");
const monthBit = require("./routes/monthBit");
const dayBit = require("./routes/dayBit");

const news = require("./routes/newsBitcoinCom");

app.use(index);
app.use(histBit);
app.use(monthBit);
app.use(dayBit);
app.use(news);

app.listen(port, () =>
  console.log(`MrCrypto-Express listening on port ${port}!`)
);
