const updater = require("./updater");

function start() {
  setInterval(() => updater.update, 30 * 60000);
}
module.exports = { start };
