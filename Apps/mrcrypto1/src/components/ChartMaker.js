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
    let max = this.props.selected.reduce(
      (max, p) => (p.close > max ? p.close : max),
      0
    );
    let min = this.props.selected.reduce(
      (min, p) => (p.close < min ? p.close : min),
      10000000
    );
    let dif = (max - min) / 5;
    dif = Math.ceil(dif / 100) * 100;

    let roundedMax = Math.ceil(max / dif) * dif;
    let roundedMin = Math.floor(min / dif) * dif;

    let series = [
      { name: "actual", color: "#8884d8", data: this.props.selected },
      { name: "sma", color: "red", data: this.props.indicator }
    ];

    return (
      <Col>
        <ToolBar />
        <ResponsiveContainer width="100%" aspect={2}>
          <LineChart
            margin={{
              top: 5,
              bottom: 80
            }}
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
  return {
    selected: prices.selected,
    indicator: state.indicators.selected,
    currency: prices.currency
  };
}

export default connect(mapStateToProps)(ChartMaker);
