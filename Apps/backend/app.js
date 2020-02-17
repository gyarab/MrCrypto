const express = require("express");
const app = express();
const port = 3001;

//services
const c_procurer = require("./src/candles/procurer");
const m_procurer = require("./src/media/procurer");
const s_procurer = require("./src/strategy/procurer");
const t_procurer = require("./src/trends/procurer");

m_procurer.start();
t_procurer.start();
c_procurer.start(() => s_procurer.start()); //as callback

//endpoints
const index = require("./routes/index");
const candles = require("./routes/candles");
const trends = require("./routes/googleTrends");
const media = require("./routes/media");

app.use(index);
app.use(candles);
app.use(trends);
app.use(media);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
