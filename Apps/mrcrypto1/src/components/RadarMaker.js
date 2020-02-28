import React, { Component } from "react";
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

class RadarMaker extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/6ebcxbx4/";

  render() {
    let statistics = this.props.statistics;
    const data = [
      { type: "SMA", value: 100 - statistics.sma },
      { type: "BOB", value: 100 - statistics.bob },
      { type: "EMA", value: 100 - statistics.ema },
      { type: "TMA", value: 100 - statistics.tma },
      { type: "WMA", value: 100 - statistics.wma }
    ];
    return (
      <Col>
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={500}
          height={500}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="type" />
          <PolarRadiusAxis />
          <Radar
            name="radar"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </Col>
    );
  }
}
function mapStateToProps(state) {
  let indicators = state.indicators;
  return {
    statistics: indicators.statistics
  };
}

export default connect(mapStateToProps)(RadarMaker);
