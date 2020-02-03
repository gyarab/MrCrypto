import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  ToggleButton,
  ToggleButtonGroup,
  Row,
  Col,
  Container
} from "react-bootstrap";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer
} from "recharts";
import { selectRange } from "../redux/actions/prices";

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
    let roundedMax = Math.ceil(max / 1000) * 1000;
    let roundedMin = Math.floor(min / 1000) * 1000;

    return (
      <Container>
        <Col>
          <Row className="justify-content-md-center">
            <ToggleButtonGroup type="radio" name="intervals" defaultValue={2}>
              <ToggleButton value={1}>Hour</ToggleButton>
              <ToggleButton value={2}>Day</ToggleButton>
              <ToggleButton value={3}>Month</ToggleButton>
              <ToggleButton value={4}>All</ToggleButton>
            </ToggleButtonGroup>
          </Row>
          <Row>
            <ResponsiveContainer className="container" height={500}>
              <LineChart
                data={this.props.selected || []}
                margin={{
                  top: 5,
                  bottom: 80
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis
                  yAxisId="left"
                  domain={[min, max]}
                  tick={{ fontSize: 10 }}
                  tickFormatter={value => this.props.currency + `${value}`}
                />

                <Tooltip
                  formatter={value => this.props.currency + `${value}`}
                />

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
              </LineChart>
            </ResponsiveContainer>
          </Row>
        </Col>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  let prices = state.prices;
  return {
    selected: prices.selected,
    currency: prices.currency
  };
}

export default connect(mapStateToProps)(ChartMaker);
