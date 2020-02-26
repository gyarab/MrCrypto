import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

class StatisticsTableMaker extends Component {
  round = value => Math.round(value * 100) / 100;
  render() {
    const writing = {
      fontSize: "18px"
    };

    var statistics = this.props.statistics;
    return (
      <Table striped bordered hover variant="dark" style={writing}>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>Overall difference between close</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SMA</td>
            <td>{this.round(statistics.sma)}%</td>
          </tr>
          <tr>
            <td>BOB</td>
            <td>{this.round(statistics.bob)}%</td>
          </tr>
          <tr>
            <td>EMA</td>
            <td>{this.round(statistics.ema)}%</td>
          </tr>
          <tr>
            <td>TMA</td>
            <td>{this.round(statistics.tma)}%</td>
          </tr>
          <tr>
            <td>WMA</td>
            <td>{this.round(statistics.wma)}%</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  let indicators = state.indicators;
  return {
    statistics: indicators.statistics
  };
}

export default connect(mapStateToProps)(StatisticsTableMaker);
