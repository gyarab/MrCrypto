const moment = require("moment");
const merger = require("./merger");

async function includeAll() {
  try {
    let all = await merger.get(moment(1442966400000), 86400); //ALL, (daily)
    let month = await merger.get(moment().subtract(30, "days"), 21600); //MONTH, every 6 hours
    let day = await merger.get(moment().subtract(1, "days"), 900); //DAY, every 15 minutes
    let hour = await merger.get(moment().subtract(1, "hours"), 60); //HOUR, every minute

    console.log("REQUESTING ALL DONE");
  } catch (merger) {
    console.log("REQUESTING ALL ERROR : " + err);
  }
}

module.exports = {
  start() {
    includeAll();
  },
  update() {}
};
