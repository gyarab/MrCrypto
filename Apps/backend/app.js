const express = require("express");
const app = express();
const port = 3001;

const index = require("./routes/index");

//get and update bitcoin price data
const c_procurer = require("./src/candles/procurer");
const m_procurer = require("./src/media/procurer");
const s_procurer = require("./src/strategy/procurer");

//services
m_procurer.start();
c_procurer.start(() => s_procurer.start()); //as callback

//import bitcoin prices
const candles = require("./routes/candles");

//import media
const media = require("./routes/media");

app.use(index);

//bitcoin candles, includes strategies
app.use(candles);

//media
app.use(media);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
