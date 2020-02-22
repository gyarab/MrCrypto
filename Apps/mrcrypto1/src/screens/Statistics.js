import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Radars from "../components/Radars";
//import chartRadar
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

class Statistics extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/6ebcxbx4/';

  render() {
    const indi = {
      color: "#5d5d5d",
      fontSize: "18px"
    };

    const headline = {
      color: "#444444",
      fontSize: "36px"
    };
    return (
      <Container>
      <Row><h2 style={headline}>Indicators success rate</h2></Row>
      <Row as={Radars} />
      <Row>
      <table style={indi}>
        <tr>
          <th>SMA</th>
          <th>BOB</th>
          <th>EMA</th>
          <th>TMA</th>
          <th>WMA</th>
        </tr>
        <tr>
          <td>38.589</td>
          <td>32.984</td>
          <td>29.155</td>
          <td>40.257</td>
          <td>29.797</td>
        </tr>

      </table>
      </Row>
      </Container>
    );
  }
}

export default connect()(Statistics);
