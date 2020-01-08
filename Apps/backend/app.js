const express = require("express");
const app = express();
const port = 3001;

const index = require("./routes/index");

//get and update bitcoin price data
const c_procurer = require("./src/candles/procurer");
m_procurer = require("./src/media/m_procurer");

//
c_procurer.start();
m_procurer.start();

//import bitcoin prices
const candles = require("./routes/candles");

//import media
const media = require("./routes/media");
app.use(index);

//bitcoin candles
app.use(candles);

//media
app.use(media);


app.listen(port, () => console.log(`Server is running on port ${port}!`));
