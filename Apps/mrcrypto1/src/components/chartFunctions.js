import moment from "moment";
var colors = require("./indicatorsColors.json");

export function formatPrice(value, currency) {
  let dec;

  if (value < 1) {
    dec = 1000;
  } else if (value < 200) {
    dec = 100;
  } else {
    dec = 10;
  }
  return currency + Math.round(value * dec) / dec;
}
//custom formatter
export function formatTime(label, props) {
  label *= 1000;
  switch (props.selected) {
    case "all":
      return moment(label).format("ll");
    case "month":
      return moment(label).format("lll");
    case "day":
      return moment(label).format("lll");
    case "hour":
      return moment(label).format("LT");
    default:
      return moment(label).format("lll");
  }
}
//values to fit the chart in
export function getAdjustValues(props) {
  let selected = props.selected;
  let interval = props.intervals[selected];

  let max = interval.reduce((max, p) => (p.close > max ? p.close : max), 0);
  let min = interval.reduce(
    (min, p) => (p.close < min ? p.close : min),
    10000000
  );
  let dif = (max - min) / 5;
  dif = Math.ceil(dif / 100) * 100;

  let roundedMax = Math.ceil(max / dif) * dif;
  let roundedMin = Math.floor(min / dif) * dif;
  return [roundedMax, roundedMin];
}

//creates current multiline set
export function getSeries(props) {
  let selected = props.selected;
  let interval = props.intervals[selected];
  let trendsInterval = props.trendsIntervals[selected];
  let toggled = props.toggled;
  let indicators = props.indicators;

  //tuning the data to match in graph
  let dif = 0;
  if (selected === "all") {
    let day = 3600 * 24 * 1000; //day in unix
    dif = (interval[0].date % day) - (trendsInterval[0].date % day);
  }
  let trends = trendsInterval;
  let cleared = trends.filter(item => {
    if (interval.some(el => el.date === item.date + dif)) {
      let newItem = item;
      newItem.date += dif;
      return newItem;
    }
  });

  //remove gaps(nulls) at start and at the end of the chart
  let firstRatio = trendsInterval.slice(0, 1).pop();
  let lastRatio = trendsInterval.slice(-1).pop();

  let first = interval.shift();
  let last = interval.pop();

  interval.push();
  interval.unshift();

  if (first && last && firstRatio && lastRatio) {
    first.ratio = firstRatio.ratio;
    last.ratio = lastRatio.ratio;

    interval.push(last);
    interval.unshift(first);
  }

  //merging and sorting not aligned dataKey
  let values = interval.concat(cleared);
  values.sort((a, b) => {
    return a.date > b.date;
  });

  //template for lines
  let config = (name, patch, width, postfix = "") => {
    return {
      name: name + postfix,
      color: colors[name],
      width,
      data: patch,
      id: "left",
      key: "close"
    };
  };

  let series = [];

  let priceLine = config("close", values, 3);
  let trendLine = config("googletrends", values, 2);
  trendLine.key = "ratio";
  trendLine.id = "right";

  series.push(priceLine); //real price
  series.push(trendLine); //google trends

  //loop for indicators
  toggled.forEach(name => {
    let patch = indicators[name] || {};
    patch = patch[selected] || [];

    //double-lined indicators
    if (patch.length === 2) {
      let firstLine = config(name, patch[0], 2, "up");
      let secondLine = config(name, patch[1], 2, "down");
      series.push(firstLine);
      series.push(secondLine);
    }
    //single-lined indicators
    else {
      let line = config(name, patch, 2);
      series.push(line);
    }
  });
  return series;
}
