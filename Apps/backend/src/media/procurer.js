const updater = require("./updater");

function start() {
  updater.update();
  setInterval(() => updater.update(), 30 * 60000);
}
module.exports = { start };
