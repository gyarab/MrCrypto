import moment from "moment";

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

  let dif = 0;
  if (selected === "all") {
    let day = 3600 * 24 * 1000; //day in unix
    dif = (interval[0].date % day) - (trendsInterval[0].date % day);
  }

  let cleared = trendsInterval.filter(item => {
    if (interval.some(el => el.date === item.date + dif)) {
      let newItem = item;
      newItem.date += dif;
      return newItem;
    }
  });

  //merging and sorting not aligned dataKey
  let values = interval.concat(cleared);
  values.sort((a, b) => {
    return a.date > b.date;
  });

  var colors = {
    sma: "#FF6633",
    wta: "#FFB399",
    ema: "#FF33FF",
    tma: "#FFFF99",
    bob: "#00B3E6"
  };

  let config = (name, patch, postfix = "") => {
    return {
      name: name + postfix,
      color: "#FF6633",
      width: 2,
      data: patch,
      id: "left",
      key: "close"
    };
  };

  let series = [];
  //real price
  series.push({
    name: "close",
    color: "#8884d8",
    width: 3,
    data: values,
    id: "left",
    key: "close"
  });
  //google trends
  series.push({
    name: "googletrends",
    color: colors[Math.floor(Math.random() * colors.length)],
    width: 2,
    data: values,
    id: "right",
    key: "ratio"
  });
  //loop for indicators
  toggled.forEach(name => {
    let patch = indicators[name] || {};
    patch = patch[selected] || [];

    //double-lined indicators (as BOB)
    if (patch.length === 2) {
      console.log(patch);
      series.push(config(name, patch[0], "up"));
      series.push(config(name, patch[1], "down"));
    }
    //single-lined indicators
    else {
      series.push(config(name, patch));
    }
  });
  return series;
}
