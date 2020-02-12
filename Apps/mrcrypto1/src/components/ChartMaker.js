import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ToolBar from "./ToolBar";

import { Row, Col, Container } from "react-bootstrap";

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
  render() {
    let intervals = this.props.intervals;
    let selected = this.props.selected;
    let toggled = this.props.toggled;
    let indicators = this.props.indicators;

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
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF"
    ];

    let series = [];
    series.push({
      name: "close",
      color: "#8884d8",
      width: 2,
      data: intervals[selected]
    });
    toggled.forEach(name => {
      let patch = indicators[name] || {};
      patch = patch[selected] || [];

      series.push({
        name,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: 1,
        data: patch
      });
    });
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
            />
            <YAxis
              yAxisId="left"
              domain={[roundedMin, roundedMax]}
              tick={{ fontSize: 10 }}
              tickFormatter={value => this.props.currency + `${value}`}
            />

            <Tooltip formatter={value => this.props.currency + `${value}`} />

            <Legend />
            {series.map(s => (
              <Line
                dot={false}
                label={false}
                yAxisId="left"
                type="monotone"
                dataKey="close"
                activeDot={{ r: 4 }}
                strokeWidth={s.width}
                stroke={s.color}
                data={s.data}
                name={s.name}
                key={s.name}
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
  return {
    selected: prices.selected,
    intervals: prices.intervals,
    currency: prices.currency,
    toggled: indicators.toggled,
    indicators: indicators.indicators
  };
}

export default connect(mapStateToProps)(ChartMaker);
