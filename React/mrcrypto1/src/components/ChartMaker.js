import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class ChartMaker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { historicalData: [], recentData: [] };
  }

  static jsfiddleUrl = "https://jsfiddle.net/alidingling/zjb47e83/";

  componentDidMount = () => {
    this.getHistorical();
    this.getRecentData();
  };

  getHistorical = async () => {
    const response = await fetch("/getall");
    const data = await response.json();

    this.prepareData(data["bpi"], true);
  };

  getRecentData = async () => {
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-11-27&end=2019-11-29" //will be consected to historical data
    );

    const data = await response.json();
    console.log(data);
    this.prepareData(data["bpi"], false);
  };

  prepareData = (data, historical) => {
    var result = [];

    for (var i in data) {
      result.push({ date: i, price: data[i] });
    }
    if (historical) {
      this.setState({ historicalData: result });
    } else {
      this.setState({ recentData: result });
    }
  };

  render() {
    return (
      <LineChart
        width={1000}
        height={500}
        data={this.state.historicalData.concat(this.state.recentData)}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 80
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
        <YAxis yAxisId="left" tickFormatter={value => "$" + `${value}`} />

        <Tooltip formatter={value => "$" + `${value}`} />
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
      </LineChart>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    // eslint-disable-next-line
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}
