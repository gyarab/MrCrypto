const express = require("express");
const app = express();
const port = 3001;

const index = require("./routes/index");

//get and update bitcoin price data
const c_procurer = require("./src/candles/procurer");
const m_procurer = require("./src/media/procurer");
c_procurer.start();
m_procurer.start();

//import bitcoin prices
const candles = require("./routes/candles");

//import media
const news = require("./routes/news");
const twitter = require("./routes/twitter");
const reddit = require("./routes/reddit");
app.use(index);

//bitcoin candles
app.use(candles);

//media
app.use(news);
app.use(twitter);
app.use(reddit);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
