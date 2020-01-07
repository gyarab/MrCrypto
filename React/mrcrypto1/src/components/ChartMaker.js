import React, { Component } from "react";
import { connect } from "react-redux";
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

class ChartMaker extends Component {
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
          domain={[0, 20000]}
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
          dataKey="close"
          stroke="#8884d8"
          activeDot={{ r: 4 }}
        />
        <Brush dataKey="close" height={20} stroke="#8884d8">
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <Line
            dot={false}
            label={false}
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
          />
        </Brush>
      </LineChart>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.prices.all,
    currency: state.prices.currency
  };
}

export default connect(mapStateToProps)(ChartMaker);
