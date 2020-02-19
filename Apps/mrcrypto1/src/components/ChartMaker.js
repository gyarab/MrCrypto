import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ToolBar from "./ToolBar";

import { Col } from "react-bootstrap";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

class ChartMaker extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/zjb47e83/";

  formatTime = label => {
    label *= 1000;
    switch (this.props.selected) {
      case "all":
        return moment(label).format("ll");
      case "month":
        return moment(label).format("MMM DD YYYY, h:mm ");
      case "day":
        return moment(label).format("MMM DD YYYY, h:mm ");
      case "hour":
        return moment(label).format("h:mm");
      default:
        return moment(label).format("ll");
    }
  };
  getSeries = () => {
    let intervals = this.props.intervals;
    let trendsIntervals = this.props.trendsIntervals;
    let selected = this.props.selected;
    let toggled = this.props.toggled;
    let indicators = this.props.indicators;

    var colors = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A"
    ];

    let series = [];
    //merging and sorting not aligned dataKey
    let values = intervals[selected].concat(trendsIntervals[selected]);
    values.sort((a, b) => {
      return a.date > b.date;
    });

    //real price
    series.push({
      name: "close",
      color: "#8884d8",
      width: 2,
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

      series.push({
        name,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: 1,
        data: patch,
        id: "left",
        key: "close"
      });
    });
    return series;
  };
  getAdjustValues = () => {
    let intervals = this.props.intervals;
    let selected = this.props.selected;

    let max = intervals[selected].reduce(
      (max, p) => (p.close > max ? p.close : max),
      0
    );
    let min = intervals[selected].reduce(
      (min, p) => (p.close < min ? p.close : min),
      10000000
    );
    let dif = (max - min) / 5;
    dif = Math.ceil(dif / 100) * 100;

    let roundedMax = Math.ceil(max / dif) * dif;
    let roundedMin = Math.floor(min / dif) * dif;
    return [roundedMax, roundedMin];
  };
  render() {
    let intervals = this.props.intervals;
    let trendsIntervals = this.props.trendsIntervals;
    let selected = this.props.selected;
    let toggled = this.props.toggled;
    let indicators = this.props.indicators;

    let preData = [];
    //console.log(trendsIntervals[selected]);
    trendsIntervals[selected].forEach(item => {
      preData.push({ date: item.date });
    });
    intervals[selected].forEach(item => {
      preData.push({ date: item.date });
    });
    //preData = [...new Set(preData)];

    let data = [];
    preData.forEach(item => {
      data.push({ date: item });
    });

    let values = this.getAdjustValues();
    let roundedMax = values[0];
    let roundedMin = values[1];

    let series = this.getSeries();

    return (
      <Col>
        <ToolBar />
        <ResponsiveContainer width="100%" aspect={2}>
          <LineChart
            margin={{
              top: 5,
              bottom: 80
            }}
            animationDuration={3000}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              allowDuplicatedCategory={false}
              tickFormatter={label => this.formatTime(label)}
            />
            <YAxis
              yAxisId="left"
              domain={[roundedMin, roundedMax]}
              tick={{ fontSize: 10 }}
              tickFormatter={value => this.props.currency + `${value}`}
            />
            <YAxis
              yAxisId="right"
              tick={{ fontSize: 10 }}
              tickFormatter={value => value}
              orientation="right"
            />

            <Tooltip
              labelFormatter={label => this.formatTime(label)}
              formatter={value => this.props.currency + `${value}`}
            />

            <Legend />
            {series.map(s => (
              <Line
                connectNulls
                dot={false}
                label={false}
                yAxisId={s.id}
                type="monotone"
                dataKey={s.key}
                activeDot={{ r: 4 }}
                strokeWidth={s.width}
                stroke={s.color}
                data={s.data}
                name={s.name}
                key={s.name}
                animationDuration={300}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  let prices = state.prices;
  let indicators = state.indicators;
  let trends = state.googletrends;
  return {
    selected: prices.selected,
    intervals: prices.intervals,
    currency: prices.currency,
    toggled: indicators.toggled,
    indicators: indicators.indicators,
    trendsIntervals: trends.intervals
  };
}

export default connect(mapStateToProps)(ChartMaker);
