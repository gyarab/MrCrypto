const express = require("express");
const app = express();
const port = 3001;

//get and update bitcoin price data
const c_procurer = require("./src/candles/procurer");
const m_procurer = require("./src/media/procurer");
const s_procurer = require("./src/strategy/procurer");

//services
m_procurer.start();
c_procurer.start(() => s_procurer.start()); //as callback

//info
const index = require("./routes/index");
app.use(index);

//bitcoin prices and strategies
const candles = require("./routes/candles");
app.use(candles);

//media
const media = require("./routes/media");
app.use(media);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
