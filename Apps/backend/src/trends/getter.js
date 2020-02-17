const googleTrends = require("google-trends-api");
const moment = require("moment");

module.exports = {
  async get(value, unit) {
    return await googleTrends.interestOverTime(
      {
        keyword: "Bitcoin",
        startTime: new Date(value),
        granularTimeResolution: true
      },
      (err, results) => {
        if (err) console.log(err);
        return JSON.parse(results).default.timelineData;
      }
    );
  }
};
