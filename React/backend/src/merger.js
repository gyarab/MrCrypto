const CoinbasePro = require("coinbase-pro");
const publicClient = new CoinbasePro.PublicClient();
const moment = require("moment");

module.exports = {
  async get(start, granularity) {
    const slotSize = 300 * granularity; //in seconds ()
    let params = { start: null, end: null, granularity };
    let pointer = start;
    let result = [];
    let slot;

    //looping due to limit (300 candles per request)
    while (moment() > moment(pointer).add(slotSize, "seconds")) {
      params.start = pointer.toISOString();
      params.end = pointer.add(slotSize, "seconds").toISOString();

      slot = await publicClient.getProductHistoricRates("BTC-USD", params);
      result.push(...slot);
    }

    //under 300 candles
    params.start = pointer.toISOString();
    params.end = moment().toISOString();

    slot = await publicClient.getProductHistoricRates("BTC-USD", params);
    result.push(...slot);

    return result;
  }
};
