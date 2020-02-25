import React, { PureComponent } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

export default class StatisticTableMaker extends PureComponent {
  render() {
    const writing = {
      fontSize: "18px"
    };
    return (
      <Table striped bordered hover variant="dark" style={writing}>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>Overall differnce between close</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SMA</td>
            <td>38.589%</td>
          </tr>
          <tr>
            <td>BOB</td>
            <td>32.984%</td>
          </tr>
          <tr>
            <td>EMA</td>
            <td>29.155%</td>
          </tr>
          <tr>
            <td>TMA</td>
            <td>40.257%</td>
          </tr>
          <tr>
            <td>WMA</td>
            <td>29.797%</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
