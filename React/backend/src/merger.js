const CoinbasePro = require("coinbase-pro");
const publicClient = new CoinbasePro.PublicClient();
const moment = require("moment");

module.exports = {
  async get(start, granularity) {
    let result = [];
    let params = {};
    let pointer = start;

    //looping due to limit (300 candles per request)
    while (moment() > moment(pointer).add(300, "days")) {
      params = {
        start: pointer.toISOString(),
        end: moment(pointer)
          .add(300, "days")
          .toISOString(),
        granularity: granularity
      };

      pointer.add(300, "days");
      const hr = await publicClient.getProductHistoricRates("BTC-USD", params);
      result = [...result, ...hr];
    }
    //under 300 candles
    params = {
      start: pointer.toISOString(),
      end: moment().toISOString(),
      granularity: granularity
    };
    const hr = await publicClient.getProductHistoricRates("BTC-USD", params);
    result = [...result, ...hr];

    return result;
  }
};
