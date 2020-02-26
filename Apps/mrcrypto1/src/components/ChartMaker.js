import React, { Component } from "react";
import { connect } from "react-redux";
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

import {
  formatPrice,
  formatTime,
  getAdjustValues,
  getSeries
} from "./chartFunctions";

class ChartMaker extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/zjb47e83/";

  render() {
    let values = getAdjustValues(this.props);
    let series = getSeries(this.props);

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
              tickFormatter={label => formatTime(label, this.props)}
            />
            <YAxis
              yAxisId="left"
              domain={values}
              tick={{ fontSize: 10 }}
              tickFormatter={value => formatPrice(value, this.props.currency)}
            />
            <YAxis
              yAxisId="right"
              tick={{ fontSize: 10 }}
              tickFormatter={value => value}
              orientation="right"
            />
            <Tooltip
              labelFormatter={label => formatTime(label, this.props)}
              formatter={value => formatPrice(value, this.props.currency)}
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
