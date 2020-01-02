const CoinbasePro = require("coinbase-pro");
const publicClient = new CoinbasePro.PublicClient();
const moment = require("moment");

async function includeAll() {
  mergeRequests(moment(1442966400000));
  console.log(moment(1443052800).format());
  console.log(moment());
  console.log(moment().format());
}
async function mergeRequests(start) {
  let params;
  let pointer = start;
  while (moment() > moment(pointer).add(300, "days")) {
    let params = {
      start: pointer.toISOString(),
      end: moment(pointer)
        .add(300, "days")
        .toISOString(),
      granularity: 86400
    };
    console.log(
      moment(params.start).format() + " -to- " + moment(params.end).format()
    );
    pointer.add(300, "days");
    console.log("-----------------------merge----------------------------");
    const hr = await publicClient.getProductHistoricRates("BTC-USD", params);
    console.log(hr.reverse());
    console.log("last--" + hr[hr.length - 1]);
  }
  console.log("XXXXXXXXXXXXX");
  //under 300
  params = {
    start: pointer.toISOString(),
    end: moment().toISOString(),
    granularity: 86400
  };
  console.log(
    moment(params.start).format() + " -to- " + moment(params.end).format()
  );
  console.log("-----------------------LAST----------------------------");
  const hr = await publicClient.getProductHistoricRates("BTC-USD", params);
  console.log(hr.reverse());
}

module.exports = {
  startUpdating() {
    includeAll();
  }
};
