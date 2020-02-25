import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

class StatisticsTableMaker extends Component {
  render() {
    const writing = {
      fontSize: "18px"
    };

    var statistics = this.props.statistics;
    console.log(this.props.statistics);
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
            <td>{statistics.sma}%</td>
          </tr>
          <tr>
            <td>BOB</td>
            <td>{statistics.sma}%</td>
          </tr>
          <tr>
            <td>EMA</td>
            <td>{statistics.ema}%</td>
          </tr>
          <tr>
            <td>TMA</td>
            <td>{statistics.tma}%</td>
          </tr>
          <tr>
            <td>WMA</td>
            <td>{statistics.wma}%</td>
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
