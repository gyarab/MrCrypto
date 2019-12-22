import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush
} from "recharts";

export default class ChartMaker extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/zjb47e83/";

  render() {
    return (
      <LineChart
        width={1000}
        height={500}
        data={this.props.data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 80
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 10 }}
          tickFormatter={value => this.props.currency + `${value}`}
        />

        <Tooltip formatter={value => this.props.currency + `${value}`} />

        <Legend />
        <Line
          dot={false}
          label={false}
          yAxisId="left"
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          activeDot={{ r: 4 }}
        />
        <Brush dataKey="price" height={20} stroke="#8884d8">
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <Line
            dot={false}
            label={false}
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
          />
        </Brush>
      </LineChart>
    );
  }
}
